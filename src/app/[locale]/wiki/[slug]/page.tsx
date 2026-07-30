import { getMarkdownContent } from "@/lib/markdown";
import { getPageBySlug, WIKI_CATEGORIES } from "@/lib/wikiConfig";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { WikiSidebar } from "@/components/WikiSidebar";

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  WIKI_CATEGORIES.forEach(cat => {
    cat.pages.filter(p => !(p as any).isSubcategoryHeader).forEach(p => {
      slugs.push({ slug: p.slug });
    });
  });
  return slugs;
}

export default async function WikiPage({ params }: { params: { slug: string } }) {
  const pageInfo = getPageBySlug(params.slug);
  
  if (!pageInfo) {
    notFound();
  }

  const { content } = await getMarkdownContent(pageInfo.filename);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <WikiSidebar categories={WIKI_CATEGORIES} currentSlug={params.slug} />

      {/* Main Content */}
      <article className="flex-1 min-w-0 bg-bdo-surface backdrop-blur-md border border-bdo-border rounded-sm p-6 md:p-10 shadow-2xl hover:border-[rgba(198,156,109,0.4)] transition-colors duration-300 ease-in-out">
        <nav className="flex items-center text-sm text-bdo-muted mb-8 pb-4 relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bdo-border to-transparent" />
          <Link href="/" className="hover:text-bdo-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>{pageInfo.category}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-300">{pageInfo.title}</span>
        </nav>
        
        <MarkdownRenderer content={content} />
      </article>
    </div>
  );
}
