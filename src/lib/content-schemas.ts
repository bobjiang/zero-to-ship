import { z } from 'zod';

const nonEmptyString = z.string().min(1);
const optionalString = z.string().optional();

export const videoSchema = z.object({
  title: nonEmptyString,
  description: z.string(),
  youtubeId: z.string(),
  maxLength: optionalString,
  estimatedDuration: optionalString,
  scriptOutline: z.array(z.string()).optional(),
  talkingPoints: z.array(z.string()).optional(),
});

export const lessonSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  description: z.string(),
  duration: z.string(),
  order: z.number(),
  youtubeId: optionalString,
  transcript: optionalString,
  learningObjectives: z.array(z.string()).optional(),
  videos: z.array(videoSchema).optional(),
  textSections: z
    .array(z.object({ title: nonEmptyString, content: z.string() }))
    .optional(),
  commonMistakes: z
    .array(z.object({ mistake: nonEmptyString, explanation: z.string() }))
    .optional(),
  reflectionQuestions: z.array(z.string()).optional(),
  exercises: z
    .array(
      z.object({
        title: nonEmptyString,
        description: z.string(),
        output: z.string(),
        successCriteria: z.union([z.string(), z.array(z.string())]),
        estimatedTime: z.string(),
      })
    )
    .optional(),
  resources: z
    .array(z.object({ title: nonEmptyString, url: z.string() }))
    .optional(),
  instructorNotes: z.array(z.string()).optional(),
});

export const seriesFileSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  description: z.string(),
  thumbnail: z.string(),
  order: z.number(),
});

export const blogFrontmatterSchema = z.object({
  title: z.string().default(''),
  excerpt: z.string().default(''),
  date: z.string().default(''),
  author: z.string().default(''),
  keywords: z.string().optional(),
});

export const shipSchema = z.object({
  slug: nonEmptyString,
  title: nonEmptyString,
  builder: nonEmptyString,
  description: z.string(),
  content: optionalString,
  date: z.string(),
  cohort: optionalString,
  tags: z.array(z.string()),
  screenshot: optionalString,
  demoUrl: optionalString,
  repoUrl: optionalString,
});

export const newsCategorySchema = z.enum([
  'research',
  'product',
  'open-source',
  'industry',
]);

export const dailyNewsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  items: z.array(
    z.object({
      title: nonEmptyString,
      summary: z.string(),
      source: nonEmptyString,
      url: nonEmptyString,
      score: z.number(),
      category: newsCategorySchema,
    })
  ),
});

export const eventConfigSchema = z.object({
  slug: nonEmptyString,
  name: nonEmptyString,
  submissionOpensAt: z.string().datetime(),
  submissionClosesAt: z.string().datetime(),
  votingClosesAt: z.string().datetime(),
  voteLimit: z.number().int().positive(),
  submissionRateLimitPerCookie24h: z.number().int().positive(),
  contactRule: z.literal('handle-or-contact'),
});

export function formatZodError(path: string, error: z.ZodError): Error {
  return new Error(
    `${path} failed schema validation: ${z.prettifyError(error)}`
  );
}
