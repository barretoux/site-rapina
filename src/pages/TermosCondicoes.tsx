// TermosCondicoes.jsx
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  PanelsTopLeft,
  ExternalLink,
  AlertCircle,
  Lock,
  Scale,
  Calendar,
  Globe,
  ScrollText,
} from "lucide-react";

/* ---------- Placeholders: substituir pelos dados reais ---------- */
const CONTROLLER = {
  name: "Grupo Rapina COM",
  cnpj: "[INSERIR CNPJ]",
  address: "Rua Doutor Vale, 24 - Moinhos de Vento, Porto Alegre, RS - Brasil",
  email: "rapinadigitalmedia@gmail.com",
  dpoEmail: "gruporapinadpo@gmail.com",
};

/* ---------- SEO ---------- */
function useSeo(title = "Termos e Condições") {
  useEffect(() => {
    document.title = `${title} • Grupo Rapina COM`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Termos e Condições do Grupo Rapina COM — regras de uso do site, propriedade intelectual, responsabilidades e legislação aplicável."
      );
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content =
        "Termos e Condições do Grupo Rapina COM — regras de uso do site, propriedade intelectual, responsabilidades e legislação aplicável.";
      document.head.appendChild(m);
    }
  }, [title]);
}

const TermosCondicoes = () => {
  useSeo("Termos e Condições");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b0b0b_0%,#0b0b0b_100%)]">
      <Navigation />
      <main className="pt-24 pb-16 termos-condicoes-content">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-2 text-foreground">
              Termos e <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">Condições</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Grupo Rapina COM</p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <p>Última atualização: Novembro de 2025</p>
            </div>
          </motion.header>

          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bem-vindo ao site oficial do <strong className="text-foreground">Grupo Rapina COM</strong> ({CONTROLLER.name}). Ao acessar ou navegar por este site (<a className="text-primary hover:underline" href="https://gruporapinacom.com">https://gruporapinacom.com</a>),
              você concorda com estes Termos e Condições. Caso não concorde, interrompa o uso.
            </p>

            <p className="text-muted-foreground mt-3 text-sm">
              Versão: 1.0 — última atualização: Novembro de 2025.
            </p>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="space-y-10">
            {/* 1 Uso Autorizado */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <PanelsTopLeft className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">1. Uso Autorizado do Site</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O site é disponibilizado para fins institucionais. O usuário compromete-se a utilizá-lo de forma ética, em conformidade com a legislação e sem causar dano à plataforma, outros usuários ou terceiros.
                  </p>

                  <p className="text-muted-foreground mt-3">
                    É proibido: invasão de sistemas, exploração de vulnerabilidades, anúncios não autorizados e qualquer conduta que viole leis ou direitos de terceiros.
                  </p>
                </div>
              </div>
            </section>

            {/* 2 PI */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <ScrollText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">2. Propriedade Intelectual</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Todo conteúdo (textos, imagens, logos, código, design) é de titularidade do Grupo Rapina ou seus licenciadores. Sua reprodução exige autorização expressa.
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Caso o site permita envio de conteúdo pelo usuário (posts, comentários), o usuário concede ao Grupo Rapina licença não exclusiva, sublicenciável e gratuita para uso (exibição, reprodução) do conteúdo no âmbito do serviço. Para uso diverso será solicitado consentimento separado.
                  </p>
                </div>
              </div>
            </section>

            {/* 3 Limitação de responsabilidade */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">3. Limitação de Responsabilidade</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O Grupo Rapina se esforça para manter o site disponível e atualizado. Contudo, não garante disponibilidade ininterrupta, livre de erros ou ausência de vulnerabilidades.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    A limitação de responsabilidade não se aplica a danos resultantes de dolo ou culpa grave, nem aos direitos indisponíveis do consumidor previstos no Código de Defesa do Consumidor.
                  </p>
                </div>
              </div>
            </section>

            {/* 4 Links e terceiros */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">4. Links e Conteúdos de Terceiros</h2>
                  <p className="text-muted-foreground">
                    Links para sites externos são fornecidos por conveniência. Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses sites. Recomendamos leitura de seus termos e políticas de privacidade.
                  </p>
                </div>
              </div>
            </section>

            {/* 5 Alterações */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">5. Alterações dos Termos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Podemos alterar estes Termos. Alterações substantivas serão comunicadas a usuários registrados com antecedência (mínimo 15 dias) e entrarão em vigor na data informada. A versão mais recente estará disponível nesta página.
                  </p>
                </div>
              </div>
            </section>

            {/* 6 Privacidade */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">6. Privacidade e Proteção de Dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O tratamento de dados pessoais ocorre conforme a nossa <a href="/politicas-privacidade" className="text-primary hover:underline">Política de Privacidade</a>, em conformidade com a LGPD (Lei nº 13.709/2018). Para informações sobre coleta, finalidade e direitos, consulte a referida política.
                  </p>
                </div>
              </div>
            </section>

            {/* 7 Foro e legislação */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">7. Legislação Aplicável e Foro</h2>
                  <p className="text-muted-foreground">
                    Estes Termos são regidos pelas leis brasileiras, incluindo LGPD e Código de Defesa do Consumidor. Para eventuais controvérsias, elegemos o foro da Comarca de Porto Alegre - RS, ressalvados os direitos do consumidor previstos em lei (o foro do domicílio do consumidor poderá prevalecer quando aplicável).
                  </p>
                </div>
              </div>
            </section>

            {/* 8 Contato / identificação */}
            <section className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">8.Contato</h2>
                  <p className="text-muted-foreground">
                    <strong>{CONTROLLER.name}</strong>
                    <br />
                    CNPJ: {CONTROLLER.cnpj}
                    <br />
                    Endereço: {CONTROLLER.address}
                    <br />
                    E-mail: <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a>
                    <br />
                    DPO: <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.dpoEmail}`}>{CONTROLLER.dpoEmail}</a>
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosCondicoes;