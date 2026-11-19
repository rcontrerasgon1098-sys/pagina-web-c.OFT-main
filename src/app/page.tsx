import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Contact from '@/components/sections/contact';
import { getNews, Article } from '@/lib/rss';
import { ScrollReveal } from '@/components/scroll-reveal';
import NewsSection from '@/components/sections/news-section';
import OurWork from '@/components/sections/our-work';

export default async function Home() {
  const articles: Article[] = await getNews();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className='relative z-10 bg-background'>
          <About />
          <OurWork />
          <Services />
          <section id="news" className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <ScrollReveal className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase">
                  Últimas Noticias
                </h2>
                <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
                  Mantente al día con las últimas novedades del mundo de la arquitectura.
                </p>
              </ScrollReveal>
              <NewsSection articles={articles.slice(0, 9)} />
            </div>
          </section>
          <div id="contact">
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
