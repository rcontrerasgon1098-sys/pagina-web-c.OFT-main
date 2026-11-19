'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollReveal } from '../scroll-reveal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor, introduce una dirección de correo válida.',
  }),
  service: z.string({
    required_error: 'Por favor, selecciona un servicio.',
  }),
  message: z.string().min(10, {
    message: 'El mensaje debe tener al menos 10 caracteres.',
  }),
});

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      service: undefined,
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("https://formspree.io/f/xblzrrov", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: 'Mensaje Enviado',
          description: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
        });
        form.reset();
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-muted/30 pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal className="flex flex-col items-center justify-center mb-20">
          <span className="text-xs font-sans tracking-[0.3em] text-primary mb-3 uppercase">Hablemos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-medium tracking-tight text-center">
            Ponte en <span className="italic font-light text-primary">Contacto</span>
          </h2>
          <div className="w-12 h-px bg-primary/50 mt-8 mb-6" />
          <p className="max-w-[600px] text-center text-muted-foreground font-light text-lg">
            ¿Tienes un proyecto en mente? Nos encantaría escucharlo y darle forma.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
          <ScrollReveal delay="200ms" className="md:col-span-5 relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 border-l border-t border-primary/20 pointer-events-none" />
            <div className="space-y-10 p-2">
              <div>
                <h3 className="text-2xl font-serif font-medium tracking-tight mb-6">Información Directa</h3>
                <div className="space-y-6 text-muted-foreground font-light">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                      <Phone className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <a href="tel:+56983732198" className="hover:text-primary transition-colors text-lg">+56 9 8373 2198</a>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                      <Mail className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <a href="mailto:colectivo.oft.arquitectura@gmail.com" className="hover:text-primary transition-colors break-words text-lg">colectivo.oft.arquitectura...</a>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                      <WhatsAppIcon />
                    </div>
                    <a href="https://wa.me/56983732198?text=Hola%20Colectivo%20OFT,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg">Contactar por WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay="400ms" className="md:col-span-7 bg-muted/30 p-8 sm:p-12 border border-border/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio de Interés</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planimetria">Planimetría</SelectItem>
                          <SelectItem value="renders">Renders</SelectItem>
                          <SelectItem value="diagramas">Diagramas</SelectItem>
                          <SelectItem value="post-produccion">Post-producción de imágenes</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos sobre tu proyecto..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting} size="lg" className="w-full sm:w-auto rounded-none tracking-widest uppercase px-12 transition-all duration-300 hover:bg-transparent hover:text-foreground border border-transparent hover:border-foreground">
                  {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
