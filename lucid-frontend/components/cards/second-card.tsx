/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { motion } from "framer-motion";

import { addUserToWaitlist } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Updated validation schema for a non-empty input
const FormSchema = z.object({
  input: z.string().min(1, { message: "Please enter at least one character." }), // Require at least one character
});

export default function SecondCard() {
  return (
    <div className="w-full py-5">
      <div className="ml-auto mr-auto flex w-[calc(100%-40px)] flex-col gap-2">
        <InputForm />
      </div>
    </div>
  );
}

function CountDownChip({
  targetDate,
  status,
}: {
  targetDate: Date;
  status: string;
}) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(
      Math.abs((targetDate.getTime() - today.getTime()) / oneDay),
    );
    const totalDays = Math.round(
      Math.abs(
        (targetDate.getTime() - new Date("2023-01-01").getTime()) / oneDay,
      ),
    );
    setPercentage(Math.round((diffDays / totalDays) * 100));
  }, [targetDate]);

  return (
    <div className="w-fit rounded-[100px] border border-stroke bg-bgGray py-1 pl-2 pr-3 text-sm text-darkGray">
      <div className="flex items-center gap-1">
        {/* Spinning indicator */}
        <div
          className={`h-4 w-4 ${status === "Processing" ? "animate-spin" : ""}`}
        >
          <CircularProgressbar strokeWidth={12} value={percentage} />
        </div>
        <span className="mb-[0.5px] ml-[2px] font-medium">{status}</span>
      </div>
    </div>
  );
}

function InputForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('question', data.input);

      const response = await fetch('http://localhost:8000/video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Video generation failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setVideoOpen(true);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <motion.div layout="position">
      <CountDownChip
        targetDate={new Date("June 15, 2024")}
        status={isSubmitting ? "Processing" : "Ready"}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[99%] space-y-2"
        >
          <FormField
            control={form.control}
            name="input"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium"></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ask Lucid a question..."
                    {...field}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"block"}
            size={"block"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Submit Prompt"}
          </Button>
        </form>
      </Form>
      {/* {isSubmitting && (
        <p className="mt-4 text-sm font-semibold">Generating video, please wait...</p>
      )} */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-4 flex items-center justify-center">
          <div className="w-full h-full max-w-4xl max-h-[80vh] relative">
            {videoUrl && (
              <video
                className="w-full h-full object-contain focus:outline-none"
                controls
                key={videoUrl}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
