from openai import OpenAI
import subprocess
import os
import re
from dotenv import load_dotenv
import json
import time
import logging
from pydantic import BaseModel
import uuid
import shutil  # Add this import at the top of the file

# Set up logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI client
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])


def post_process_latex(manim_code):
    # Fix common LaTeX errors
    manim_code = manim_code.replace(r'\f\frac', r'\frac')
    manim_code = manim_code.replace(r'\\frac', r'\frac')
    # Remove backslash before quotes
    manim_code = manim_code.replace(r'\"', r'"')

    # Fix cases where \frac is incorrectly escaped
    manim_code = re.sub(r'\\\\frac', r'\\frac', manim_code)

    # Ensure proper spacing in equations
    # Add space before parentheses
    manim_code = re.sub(r'(\w+)\(', r'\1 (', manim_code)
    # Add space before equals sign
    manim_code = re.sub(r'(\w+)=', r'\1 =', manim_code)

    # Wrap standalone math expressions in \text{}
    manim_code = re.sub(
        r'MathTex\((.*?)\)', lambda m: f'MathTex(r"\\text{{{{{m.group(1)}}}}}")', manim_code)

    return manim_code


class ManimVisualization(BaseModel):
    manim_code: str
    description: str


def generate_manim_visualization(query, output_folder='./output_videos'):
    start_time = time.time()

    # Delete the media folder if it exists
    media_folder = './media'
    if os.path.exists(media_folder):
        logging.info(f"Deleting existing media folder: {media_folder}")
        shutil.rmtree(media_folder)

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    logging.info(f"Starting visualization generation for query: {query}")

    # Create custom_voiceover_scene.py in the output folder
    custom_scene_path = os.path.join(output_folder, 'custom_voiceover_scene.py')
    with open(custom_scene_path, 'w') as f:
        f.write('''
from manim_voiceover import VoiceoverScene

class CustomVoiceoverScene(VoiceoverScene):
    def set_speech_service(self, speech_service, create_subcaption=False):
        super().set_speech_service(speech_service, create_subcaption=create_subcaption)
''')

    logging.info("Querying o1-preview model...")
    o1_start_time = time.time()
    o1_response = client.chat.completions.create(
        model="o1-preview",
        messages=[
            {
                "role": "user",
                "content": f"""
                  Generate Manim code (Community Edition latest or v0.17.0+ for fallback) to visualize: "{query}"

                  Requirements:
                  (SUPER). MAKE SURE NO TEXTS OVERLAP EACH OTHER EVER. Keep track of the position of each text, math equation and shape placement and make sure they never overlap.
                  0. Use only the following imports:
                     from manim import *
                     from custom_voiceover_scene import CustomVoiceoverScene
                     from manim_voiceover.services.gtts import GTTSService
                  1. LaTeX: Use single backslash for commands, e.g., \frac{{num}}{{den}} for fractions. For all MathTex expressions, use raw strings and proper LaTeX formatting. For example:
                      MathTex(r"x(t) = \\frac{1}{2} t^2")

                  2. Use latest Manim syntax (e.g., 'Create' instead of 'ShowCreation').
                  3. Structure: Intro, Problem Statement, Visualization, Explanation, Conclusion. Make sure that the visualizations and explanations are longer than other components. Don't make the explanation too brief.
                  4. Use MathTex for math, Text for regular text. No $ symbols in MathTex.
                  5. Only use LaTeX from: amsmath, amssymb, mathtools, physics, xcolor.
                  6. Ensure readability: proper spacing, consistent fonts, colors. Make sure all the text other than the title has a font size of 24.
                  7. Use smooth animations and transitions.
                  8. Code must be clean, well-commented, and organized.
                  9. Have visuals that are rendered and cleared before next visual comes on. CLEAR ALL VISUALS BEFORE RENDERING NEW. Use the clear function before moving onto a new visual.
                  10. Never use underline as an argument for Text in the manim code. Remove the title after the showing it for the first few moments.
                  11. Use the manim-voiceover library with GTTS for voice-over.
                  12. Your main class should inherit from CustomVoiceoverScene (defined below).
                  13. Set up the GTTS service in the construct method using English language.
                  14. Use voice-over for all explanations and narrations.
                  15. Use a __main__ check to ensure only the main visualization class is rendered.
                  16. Synchronize voiceover with animations using the tracker variable:
                      - Wrap each animation block with a voiceover block
                      - Use the tracker.duration to set the run_time for animations
                      - For multiple animations in one voiceover, distribute the duration appropriately

                  Example structure:
                  ```python
                  from manim import *
                  from custom_voiceover_scene import CustomVoiceoverScene
                  from manim_voiceover.services.gtts import GTTSService

                  class ConceptVisualization(CustomVoiceoverScene):
                      def construct(self):
                          gtts_service = GTTSService(lang="en", tld="com")
                          self.set_speech_service(gtts_service)

                          # Introduction
                          with self.voiceover(text="Let's try and understand [Concept].") as tracker:
                              title = Text("Concept Title")
                              self.play(Write(title), run_time=tracker.duration/2)
                              self.wait(tracker.duration/2)
                              self.play(FadeOut(title))

                          self.clear()

                          # Problem Statement
                          with self.voiceover(text="Let's explore the problem of...") as tracker:
                              problem = Text("Problem description", font_size=24)
                              self.play(Write(problem), run_time=tracker.duration)

                          # Visualization and Explanation
                          with self.voiceover(text="Now, let's visualize this concept.") as tracker:
                              # Add relevant visual elements and animations
                              # Use tracker.duration to set run_time for animations

                          # Conclusion
                          with self.voiceover(text="In conclusion, we've learned that...") as tracker:
                              conclusion = Text("Key takeaways", font_size=24)
                              self.play(Write(conclusion), run_time=tracker.duration/2)
                              self.wait(tracker.duration/2)

                          self.wait(1)

                  if __name__ == "__main__":
                      scene = ConceptVisualization()
                      scene.render()
                  ```

                  Provide only a JSON response with:
                  - manim_code: Complete Manim code as a string
                  - description: Brief description of the visualization

                  No additional text or explanations outside the JSON structure.
                """
            }
        ]
    )
    o1_end_time = time.time()
    logging.info(
        f"o1-preview model response received in {o1_end_time - o1_start_time:.2f} seconds")

    o1_content = o1_response.choices[0].message.content

    o1_log_filename = os.path.join(output_folder, 'o1_response_log.json')
    with open(o1_log_filename, 'w') as f:
        json.dump(o1_response.model_dump(), f, indent=2)
    logging.info(f"o1 response logged to {o1_log_filename}")

    logging.info("Parsing o1 response with gpt-4o-mini...")
    parse_start_time = time.time()
    parse_response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Given the following data, format it with the given response format: {o1_content}"
            }
        ],
        response_format=ManimVisualization,
    )
    parse_end_time = time.time()
    logging.info(
        f"gpt-4o-mini parsing completed in {parse_end_time - parse_start_time:.2f} seconds")

    parse_log_filename = os.path.join(output_folder, 'parse_response_log.json')
    with open(parse_log_filename, 'w') as f:
        json.dump(parse_response.model_dump(), f, indent=2)
    logging.info(f"Parse response logged to {parse_log_filename}")

    parsed_data = parse_response.choices[0].message.parsed
    manim_code = parsed_data.manim_code
    manim_code = post_process_latex(manim_code)
    description = parsed_data.description

    manim_code_filename = os.path.join(output_folder, 'generated_manim_code.py')
    with open(manim_code_filename, 'w') as f:
        f.write(manim_code)
    logging.info(f"Manim code saved to {manim_code_filename}")

    logging.info("Executing Manim code...")
    manim_start_time = time.time()
    random_id = str(uuid.uuid4())[:8]  # Generate a random 8-character ID
    output_file = f'output_{random_id}'
    
    try:
        result = subprocess.run(
            ['manim', '-ql', '-o', output_file, manim_code_filename, '--renderer=opengl', '--write_to_movie', '--disable_caching'],
            check=True,
            capture_output=True,
            text=True
        )
        logging.info("Manim output:")
        logging.info(result.stdout)
    except subprocess.CalledProcessError as e:
        logging.error(f"Error running Manim: {e}")
        logging.error("Manim error output:")
        logging.error(e.stderr)
        logging.error("Check the generated Manim code for potential errors.")
        return None  # Return None if video generation fails

    manim_end_time = time.time()
    logging.info(f"Manim execution completed in {manim_end_time - manim_start_time:.2f} seconds")

    # Find the generated video
    video_quality = "480p15"  # This is based on the -ql flag. Use "1080p60" for -qh
    video_dir = os.path.join("media", "videos", "generated_manim_code", video_quality)
    
    output_video_path = None
    for file in os.listdir(video_dir):
        if file.endswith(".mp4"):
            output_video_path = os.path.join(video_dir, file)
            logging.info(f"Video file found at {output_video_path}")
            break
    
    if output_video_path is None:
        logging.warning("No video file found in the expected directory.")
        return None

    # Save the description
    description_filename = os.path.join(output_folder, 'visualization_description.txt')
    with open(description_filename, 'w') as f:
        f.write(description)
    logging.info(f"Visualization description saved to {description_filename}")

    end_time = time.time()
    total_time = end_time - start_time
    logging.info(f"Manim visualization process completed in {total_time:.2f} seconds")

    return output_video_path  # Return the path to the saved video


# Example usage
# video_path = generate_manim_visualization("explain the structure of a cell in biology")
# if video_path:
#     print(f"Video generated and saved at: {video_path}")
# else:
#     print("Video generation failed.")
