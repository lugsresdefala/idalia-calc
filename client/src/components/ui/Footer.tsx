import { Link } from "wouter";
import { Shield, FileText, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-md border-t border-cyan-400/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              IdaliaCalc
            </h3>
            <p className="text-blue-200/70 text-sm">
              Plataforma especializada em saúde reprodutiva com calculadoras avançadas 
              de fertilidade e gestação.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-3">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200/70 hover:text-cyan-300 text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/algoritmos" className="text-blue-200/70 hover:text-cyan-300 text-sm transition-colors">
                  Algoritmos
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-blue-200/70 hover:text-cyan-300 text-sm transition-colors">
                  Assinatura
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-blue-200/70 hover:text-cyan-300 text-sm transition-colors flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-200/70 hover:text-cyan-300 text-sm transition-colors flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contato
            </h3>
            <ul className="space-y-2">
              <li className="text-blue-200/70 text-sm">
                contato@idaliareprodutiva.com
              </li>
              <li className="text-blue-200/70 text-sm">
                Suporte: seg-sex, 9h-18h
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cyan-400/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200/50 text-xs text-center md:text-left">
              © 2025 IdaliaCalc. Todos os direitos reservados.
            </p>
            <p className="text-blue-200/50 text-xs text-center md:text-right">
              Plataforma em conformidade com LGPD | Dados protegidos com criptografia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}