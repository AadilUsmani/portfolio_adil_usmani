import { notFound } from "next/navigation";
import { projects } from "@/lib/dataV2";
import { ProjectDetailView } from "@/components/project-detail/ProjectDetailView";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project Not Found · Muhammad Adil Usmani" };
  }
  return {
    title: `${project.title} · Muhammad Adil Usmani`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
