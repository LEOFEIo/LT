import { asc, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { jobs } from "../../db/schema";
import { demoJobs } from "./demo-data";

export async function getPublicJobs() {
  if (!process.env.DATABASE_URL) return [...demoJobs];

  return getDb()
    .select()
    .from(jobs)
    .where(eq(jobs.status, "active"))
    .orderBy(asc(jobs.id));
}

export async function getPublicJob(slug: string) {
  if (!process.env.DATABASE_URL) {
    return demoJobs.find((job) => job.slug === slug) ?? null;
  }

  const [job] = await getDb()
    .select()
    .from(jobs)
    .where(eq(jobs.slug, slug))
    .limit(1);
  return job?.status === "active" ? job : null;
}
