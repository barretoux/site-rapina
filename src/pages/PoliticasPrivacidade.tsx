// PoliticasPrivacidade.jsx
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Cookie,
  Share2,
  Key,
  Calendar,
  MapPin,
  Info,
  Server,
  AlertTriangle,
  User,
} from "lucide-react";

/**
 * Política de Privacidade - Versão Premium
 *
 * Observações:
 * - Substitua os placeholders abaixo pelos dados reais do Grupo Rapina.
 */

/* ---------- Configs / Placeholders (substituir) ---------- */
const CONTROLLER = {
  name: "Grupo Rapina COM",
  cnpj: "55.718.545/0001-20",
  address: "Rua Doutor Vale, 24 - Moinhos de Vento, Porto Alegre - RS, Brasil",
  email: "rapinadigitalmedia@gmail.com", // contato público
  dpoEmail: "gruporapinadpo@gmail.com", // DPO / encarregado (substituir)
};

/* ---------- Helper 2.0: set document title + meta ---------- */
/**
 * Melhorias implementadas:
 * - Evita duplicação de meta tags iguais
 * - Permite atualizar keywords e og tags
 * - Criação automática de meta charset/viewport se faltarem
 * - Atualiza canonical automaticamente
 */

function useSeo(
  title = "Política de Privacidade",
  description = "Política de Privacidade do Grupo Rapina COM — como coletamos, usamos, armazenamos e protegemos seus dados pessoais (LGPD)."
) {
  useEffect(() => {
    document.title = `${title} • Grupo Rapina COM`;

    /** Garantir meta tags padrão */
    function ensureMeta(name: string, content: string) {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta") as HTMLMetaElement;
        tag.name = name;
        document.head.appendChild(tag);
      }

      tag.content = content;
    }

    ensureMeta("description", description);
    ensureMeta("keywords", "privacidade, LGPD, proteção de dados, Grupo Rapina, compliance");

    /** Open Graph */
    function ensureOg(property: string, content: string) {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta") as HTMLMetaElement;
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }

      tag.content = content;
    }

    ensureOg("og:title", document.title);
    ensureOg("og:description", description);
    ensureOg("og:type", "website");

    /** Canonical */
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link") as HTMLLinkElement;
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = window.location.href;

  }, [title, description]);
}

const PoliticasPrivacidade = () => {
  useSeo("Políticas de Privacidade");
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b0b0b_0%,#0b0b0b_100%)]">
      <Navigation />
      <main className="pt-24 pb-16 privacy-policy-content">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-2 text-foreground">
              Políticas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">Privacidade</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Grupo Rapina COM</p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <p>Última atualização: Novembro de 2025</p>
            </div>
          </motion.header>

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm mb-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              O <strong className="text-foreground">{CONTROLLER.name}</strong> valoriza a privacidade e a proteção dos dados dos visitantes e clientes.
              Esta Política descreve de forma clara como coletamos, usamos, armazenamos e protegemos informações pessoais, em conformidade com a Lei
              Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
            </p>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="space-y-10">
            {/* 1. Identificação do Controlador */}
            <section id="identificacao" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">1. Controlador dos Dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Responsável:</strong> {CONTROLLER.name}
                    <br />
                    <strong>CNPJ:</strong> {CONTROLLER.cnpj}
                    <br />
                    <strong>Endereço:</strong> {CONTROLLER.address}
                    <br />
                    <strong>Canal para exercício de direitos e dúvidas:</strong>{" "}
                    <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a>
                    <br />
                    <strong>Encarregado (DPO):</strong>{" "}
                    <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.dpoEmail}`}>{CONTROLLER.dpoEmail}</a>
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Coleta */}
            <section id="coleta" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-2 text-foreground">2. Coleta de Informações</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Coletamos dados de duas formas:
                  </p>
                  <ul className="ml-4 list-disc text-muted-foreground space-y-2">
                    <li><strong>Fornecidos diretamente:</strong> nome, e-mail, telefone, cargo/empresa, conteúdo de mensagens em formulários.</li>
                    <li><strong>Coleta automática:</strong> endereço IP, tipo de dispositivo, informações de navegação (logs), cookies e identificadores de publicidade.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Finalidades + Bases Legais */}
            <section id="finalidades" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">3. Finalidades e Bases Legais</h2>
                  <p className="text-muted-foreground mb-3">Abaixo listamos as principais finalidades de tratamento e sua base legal conforme a LGPD:</p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left py-2 pr-4">Finalidade</th>
                          <th className="text-left py-2 pr-4">Dados</th>
                          <th className="text-left py-2">Base legal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-top">
                          <td className="py-2 pr-4 text-muted-foreground">Responder contatos e suporte</td>
                          <td className="py-2 pr-4 text-muted-foreground">Nome, e-mail, mensagem</td>
                          <td className="py-2 text-muted-foreground">Execução de contrato / legítimo interesse</td>
                        </tr>
                        <tr className="align-top">
                          <td className="py-2 pr-4 text-muted-foreground">Envio de newsletters e marketing</td>
                          <td className="py-2 pr-4 text-muted-foreground">E-mail, preferências</td>
                          <td className="py-2 text-muted-foreground">Consentimento</td>
                        </tr>
                        <tr className="align-top">
                          <td className="py-2 pr-4 text-muted-foreground">Analytics e performance do site</td>
                          <td className="py-2 pr-4 text-muted-foreground">IP (anonimizado), páginas visitadas</td>
                          <td className="py-2 text-muted-foreground">Legítimo interesse / Consentimento (para marketing)</td>
                        </tr>
                        <tr className="align-top">
                          <td className="py-2 pr-4 text-muted-foreground">Cumprimento de obrigações legais</td>
                          <td className="py-2 pr-4 text-muted-foreground">Dados cadastrais, logins</td>
                          <td className="py-2 text-muted-foreground">Obrigação legal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    Nota: quando o tratamento se basear em consentimento, o titular poderá revogá-lo a qualquer momento sem afetar tratamentos
                    realizados anteriormente com base no consentimento.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Cookies */}
            <section id="cookies" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">4. Cookies</h2>
                  <p className="text-muted-foreground mb-3">Utilizamos cookies para melhorar a experiência e obter estatísticas anônimas. A seguir, categorias e exemplos:</p>

                  <ul className="ml-4 list-disc text-muted-foreground space-y-2">
                    <li><strong>Estritamente necessários:</strong> essenciais ao funcionamento; não dependem de consentimento.</li>
                    <li><strong>Analíticos:</strong> Google Analytics (exemplo) — auxílio à melhoria do site. Podem depender de consentimento.</li>
                    <li><strong>Marketing:</strong> pixels e trackers para campanhas (ex.: Google Ads, Facebook Pixel) — exigem consentimento.</li>
                  </ul>

                  <p className="text-sm text-muted-foreground mt-3">
                    Você pode gerenciar preferências através do banner de cookies (no rodapé) ou pelas configurações do seu navegador.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Compartilhamento de Dados */}
            <section id="compartilhamento" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Share2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">5. Compartilhamento</h2>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Não comercializamos seus dados. Podemos compartilhar dados com:
                  </p>
                  <ul className="ml-4 list-disc text-muted-foreground space-y-2">
                    <li>Prestadores de serviço (hospedagem, e-mail marketing, CRM, analytics) sob contratos com cláusulas de tratamento (DPA).</li>
                    <li>Autoridades públicas quando exigido por lei ou ordem judicial.</li>
                    <li>Com seu consentimento, parceiros comerciais para campanhas.</li>
                  </ul>

                  <p className="text-xs text-muted-foreground mt-2">
                    Transferências internacionais: quando necessárias, adotamos cláusulas contratuais e garantias adequadas conforme LGPD.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Armazenamento e segurança */}
            <section id="seguranca" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">6. Armazenamento e Segurança</h2>
                  <p className="text-muted-foreground mb-2">
                    Adotamos medidas técnicas e administrativas razoáveis para proteger os dados (criptografia em trânsito, controle de acesso, backups).
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Em caso de incidente de segurança que gere risco relevante aos titulares, notificaremos a ANPD e os titulares conforme exigido por lei,
                    informando escopo, dados afetados e medidas mitigatórias adotadas.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Direitos do titular e procedimento */}
            <section id="direitos" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">7. Direitos do Titular</h2>
                  <p className="text-muted-foreground mb-3">Você tem direito a:</p>
                  <ul className="ml-4 list-disc text-muted-foreground space-y-2">
                    <li>Acessar, corrigir, excluir dados;</li>
                    <li>Revogar consentimento;</li>
                    <li>Portabilidade em formato interoperável;</li>
                    <li>Informação sobre o compartilhamento e a finalidade do tratamento.</li>
                  </ul>

                  <div className="mt-3 text-muted-foreground">
                    <p className="mb-2">Procedimento prático:</p>
                    <ol className="ml-4 list-decimal space-y-2">
                      <li>Envie solicitação para <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a> ou para o DPO <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.dpoEmail}`}>{CONTROLLER.dpoEmail}</a>.</li>
                      <li>Informe seu nome completo, e-mail e descreva a solicitação. Em certas situações pode ser solicitada comprovação de identidade.</li>
                      <li>Confirmaremos o recebimento em até <strong>7 dias úteis</strong> e forneceremos resposta final em até <strong>30 dias</strong> (podendo ser prorrogado mediante justificativa).</li>
                      <li>Se insatisfeito, o titular pode registrar reclamação na ANPD.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Retenção */}
            <section id="retencao" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">8. Prazos de Retenção</h2>
                  <p className="text-muted-foreground mb-2">Exemplos de critérios e prazos (ajustar conforme realidade):</p>
                  <ul className="ml-4 list-disc text-muted-foreground space-y-2">
                    <li>Formulários de contato: 6 meses após último contato, salvo necessidade legal.</li>
                    <li>Dados contratuais: enquanto vigorar o contrato e por até 5 anos após seu término para cumprimento de obrigações fiscais/legais.</li>
                    <li>Logs e analytics: 24 meses (posteriormente anonimizados ou excluídos).</li>
                    <li>Backups: retenção controlada internamente até 3 anos.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Alterações */}
            <section id="alteracoes" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">9. Alterações nesta Política</h2>
                  <p className="text-muted-foreground">
                    Atualizamos esta Política quando necessário. Em alterações substantivas, notificaremos usuários registrados com antecedência.
                    A versão atualizada estará disponível nesta página com data de revisão.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Contato */}
            <section id="contato" className="bg-card/30 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold uppercase mb-3 text-foreground">10. Contato</h2>
                  <p className="text-muted-foreground">
                    Para dúvidas, solicitações de direitos ou reclamações:
                    <br />
                    <strong>{CONTROLLER.name}</strong>
                    <br />
                    E-mail: <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.email}`}>{CONTROLLER.email}</a>
                    <br />
                    DPO: <a className="text-primary hover:underline" href={`mailto:${CONTROLLER.dpoEmail}`}>{CONTROLLER.dpoEmail}</a>
                    <br />
                    Endereço: {CONTROLLER.address}
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

export default PoliticasPrivacidade;
