import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Voz Ciudadana Panamá</h3>
            <p className="text-sm text-gray-500">
              Plataforma para la participación cívica digital fortalecida en Panamá.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/problematicas" className="text-gray-500 hover:text-primary">
                  Problemáticas
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-gray-500 hover:text-primary">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-gray-500 hover:text-primary">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-primary">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-gray-500 hover:text-primary">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-500 hover:text-primary">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-500 hover:text-primary">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/accesibilidad" className="text-gray-500 hover:text-primary">
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Suscríbete</h3>
            <p className="text-sm text-gray-500">Recibe actualizaciones sobre nuevas problemáticas y resultados.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Tu correo electrónico" />
              <Button type="submit" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>Suscribirse</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">Al suscribirte, aceptas nuestra política de privacidad.</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          <p>© 2025 Voz Ciudadana Panamá. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
