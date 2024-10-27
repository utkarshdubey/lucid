
Inspiration
We were inspired by 3b1b, a YouTube mathematician who has made an animation library called Manim. It intrigued us and we wanted to see how it would work with an LLM and if it could create videos at the same level as 3b1b.

What it does
It takes in a simple prompt and generates a video using the Manim library incorporating animations and transitions explaining the prompt. It also has a voiceover that narrates the whole thing.

How we built it
We first built the backend which involves generating a suitable prompt for the o1-preview and then parsing and tokenizing the output to get the correctly formatted Manim code. We then render the animation from the Manim code and add a correctly synced voiceover to the video as the final output.

Challenges we ran into
The biggest challenge we ran into was getting the o1-preview LLM to generate a suitable Manim code that has all the correct renderings and no overlapping visuals. Since the LLM is a black-box the only thing we had control over was getting it the correct prompt with all the necessary examples and data sets to help it generate exactly what we want.

Accomplishments that we're proud of
We're proud of being able to get around our biggest challenge of generating a correctly rendered video from o1-preview LLM and syncing the voiceover with it. We're also proud of building a UI that enhances our user experience.

What we learned
We learned to a great extent how LLMs work and how giving the correct prompt with all the required help can help generate the desired output. We also learned a lot about the Manim library built by 3b1b and how rendering videos works.

What's next for Lucid
If we had more time we could've implemented longer videos that get into the finer details of every concept. We would also like to further enhance its capabilities to render 3-dimensional videos.

Contributors:

- Aditya Sharma
- Bobir Asatov
- Joffre Loor
- Utkarsh

