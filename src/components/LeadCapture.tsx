import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormShape = {
  name: string;
  email: string;
  whatsapp: string; // stored as digits only in state
  company: string;
  sector: string;
  revenue: string;
};

const initialForm: FormShape = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  sector: "",
  revenue: "",
};

const LeadCapture: React.FC = () => {
  const [formData, setFormData] = useState<FormShape>(initialForm);
  const [whatsappError, setWhatsappError] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * formatWhatsappDisplay
   * - Recebe o valor numérico (somente dígitos) e formata para exibição:
   *   (XX) 9XXXX-XXXX ou parcial enquanto digita.
   * - Idempotente: se receber um valor já formatado, converte corretamente.
   */
  const formatWhatsappDisplay = (digits: string) => {
    const d = digits.replace(/\D/g, "").slice(0, 11); // garante apenas dígitos, max 11
    if (!d) return "";
    if (d.length <= 2) return `(${d}`;
    if (d.length === 3) return `(${d.slice(0, 2)}) ${d[2]}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d[2]}${d.slice(3)}`;
    // 11 dígitos: (XX) 9XXXX-XXXX
    return `(${d.slice(0, 2)}) ${d[2]}${d.slice(3, 7)}-${d.slice(7)}`;
  };

  /**
   * formatWhatsappMaskedForSave
   * - Recebe dígitos e retorna o formato brasileiro com máscara:
   *   (XX) 9XXXX-XXXX
   * - Se insuficiente, retorna null (será enviado como null)
   */
  const formatWhatsappMaskedForSave = (digits: string) => {
    const d = digits.replace(/\D/g, "");
    if (!d) return null;
    if (d.length < 10) return null; // inválido/incompleto
    // if length is 10 (without the '9') still allow? your validation enforces '9' at index 2
    const dd = d.slice(0, 11); // ensure max 11
    if (dd.length <= 2) return null;
    if (dd.length <= 3) return `(${dd.slice(0, 2)}) ${dd[2]}`;
    if (dd.length <= 7) return `(${dd.slice(0, 2)}) ${dd[2]}${dd.slice(3)}`;
    return `(${dd.slice(0, 2)}) ${dd[2]}${dd.slice(3, 7)}-${dd.slice(7)}`;
  };

  const validate = (): boolean => {
    // basic required checks
    if (!formData.name.trim()) {
      setErrorMessage("Por favor, informe seu nome.");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Por favor, informe seu e-mail.");
      return false;
    }
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Por favor, informe um e-mail válido.");
      return false;
    }

    // setor e faturamento são obrigatórios (conforme confirmado)
    if (!formData.sector || !formData.sector.trim()) {
      setErrorMessage("Por favor, selecione seu setor.");
      return false;
    }
    if (!formData.revenue || !formData.revenue.trim()) {
      setErrorMessage("Por favor, selecione o faturamento mensal.");
      return false;
    }

    // whatsapp length check (BR pattern: DDD + 9 + 8 digits = up to 11 digits)
    if (formData.whatsapp) {
      const numeric = formData.whatsapp.replace(/\D/g, "");
      if (numeric.length < 10) {
        setErrorMessage("WhatsApp incompleto. Informe DDD + número.");
        return false;
      }
      // garante que o terceiro dígito seja '9' conforme regra BR (index 2)
      if (numeric.length >= 3 && numeric[2] !== "9") {
        setWhatsappError("O primeiro dígito do número deve ser 9");
        setErrorMessage("Corrija o WhatsApp.");
        return false;
      }
    }

    // company required
    if (!formData.company.trim()) {
      setErrorMessage("Por favor, informe o nome da empresa.");
      return false;
    }

    setErrorMessage(null);
    setWhatsappError("");
    return true;
  };

  const buildPayload = () => {
    // usa máscara brasileira ao salvar, conforme solicitado
    const maskedWhatsapp = formatWhatsappMaskedForSave(formData.whatsapp);

    return {
      nome: formData.name.trim(),
      email: formData.email.trim(),
      whatsapp: maskedWhatsapp, // "(51) 99999-9999" or null
      empresa: formData.company.trim(),
      setor: formData.sector || null,
      faturamento: formData.revenue || null,
      origem: "landing",
      pagina: typeof window !== "undefined" ? window.location.pathname : null,
      utm_source: (() => {
        try {
          return localStorage.getItem("utm_source");
        } catch {
          return null;
        }
      })(),
      utm_medium: (() => {
        try {
          return localStorage.getItem("utm_medium");
        } catch {
          return null;
        }
      })(),
      utm_campaign: (() => {
        try {
          return localStorage.getItem("utm_campaign");
        } catch {
          return null;
        }
      })(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrorMessage(null);

    const payload = buildPayload();

    try {
      const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!functionUrl) {
        throw new Error(
          "VITE_SUPABASE_FUNCTION_URL não está configurada. Configure a variável de ambiente."
        );
      }

      if (!anonKey) {
        throw new Error(
          "VITE_SUPABASE_ANON_KEY não está configurada. Configure a variável de ambiente."
        );
      }

      console.log("Enviando para:", functionUrl);
      console.log("Payload:", payload);

      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        // Tenta ler o JSON da resposta
        let json = null;
        try {
          const text = await response.text();
          json = JSON.parse(text);
        } catch (err) {
          // Se não conseguir parsear, continua com erro genérico
        }
        
        // Tratamento específico para spam (429 Too Many Requests)
        if (response.status === 429 && json?.code === "SPAM_DETECTED") {
          throw new Error(json.message || "Você já enviou seus dados recentemente. Por favor, aguarde 24 horas antes de enviar novamente.");
        }
        
        console.error("Erro na Edge Function:", response.status, json);
        throw new Error(json?.message || "Falha ao enviar os dados. Tente novamente em alguns instantes.");
      }

      const json = await response.json();
      if (json?.error) {
        console.error("Resposta da função com erro:", json.error);
        
        // Tratamento específico para spam/duplicata
        if (json.code === "SPAM_DETECTED" || json.error === "DUPLICATE_EMAIL") {
          throw new Error(json.message || "Você já enviou seus dados recentemente. Por favor, aguarde 24 horas antes de enviar novamente.");
        }
        
        throw new Error(json.message || "Erro no processamento dos dados. Tente novamente mais tarde.");
      }

      // sucesso: limpar state e redirecionar
      setFormData(initialForm);
      navigate("/obrigado");
    } catch (err: any) {
      console.error("submit error:", err);
      
      // Tratamento específico para "Failed to fetch"
      if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
        setErrorMessage(
          "Erro de conexão. Verifique se a Edge Function está deployada e a URL está correta."
        );
      } else {
        setErrorMessage(err?.message || "Ocorreu um erro ao enviar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="lead-capture"
      className="pt-2 pb-36 px-auto relative overflow-visible"
      style={{
        background: "linear-gradient(180deg, #121212 0%,rgb(100, 30, 6) 100%)",
      }}
    >
      {/* Background gradient com o degradê laranja trazido da seção WhyChoose */}
      {/* Animated glow effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative flex justify-center md:block"
            >
              <div className="absolute -top-8 -left-16 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-4 -left-8 w-16 h-16 bg-red-400/30 rounded-full blur-2xl" />

              <form
                onSubmit={handleSubmit}
                className="relative border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl space-y-4 shadow-2xl shadow-red-500/10 max-w-md w-full"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px 0 rgba(220, 38, 38, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                }}
                aria-labelledby="lead-form-title"
              >
                <h2 id="lead-form-title" className="sr-only">
                  Formulário de contato
                </h2>

                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                      setFormData({ ...formData, name: value });
                    }}
                    className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                    Seu melhor e-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm"
                    style={{ backdropFilter: "blur(10px)" }}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="whatsapp" className="text-xs font-medium text-muted-foreground">
                    Número de WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(XX) 9XXXX-XXXX"
                    value={formatWhatsappDisplay(formData.whatsapp)}
                    onChange={(e) => {
                      // gravamos apenas dígitos no state
                      const numeric = e.target.value.replace(/\D/g, "").slice(0, 11);
                      if (numeric.length >= 3 && numeric[2] !== "9") {
                        setWhatsappError("O número de telefone é inválido");
                      } else {
                        setWhatsappError("");
                      }
                      setFormData({ ...formData, whatsapp: numeric });
                    }}
                    className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm"
                    aria-invalid={!!whatsappError}
                    required
                  />
                  {whatsappError && <p className="text-red-500 text-xs font-semibold mt-1">{whatsappError}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-xs font-medium text-muted-foreground">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm"
                    style={{ backdropFilter: "blur(10px)" }}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 max-[535px]:grid-cols-1">
                  <div className="space-y-1.5">
                    <Label htmlFor="sector" className="text-xs font-medium text-muted-foreground">
                      Qual o seu setor?
                    </Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) => setFormData({ ...formData, sector: value })}
                      required
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm" style={{ backdropFilter: "blur(10px)" }}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="varejo">Varejo</SelectItem>
                        <SelectItem value="servicos">Serviços</SelectItem>
                        <SelectItem value="industria">Indústria</SelectItem>
                        <SelectItem value="construcao">Construção</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="revenue" className="text-xs font-medium text-muted-foreground">
                      Faturamento mensal
                    </Label>
                    <Select
                      value={formData.revenue}
                      onValueChange={(value) => setFormData({ ...formData, revenue: value })}
                      required
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 focus:border-primary/50 focus:bg-white/15 h-10 backdrop-blur-sm text-sm" style={{ backdropFilter: "blur(10px)" }}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border z-50">
                        <SelectItem value="0-50k">Até R$ 50k</SelectItem>
                        <SelectItem value="51k-70k">R$ 51k - R$ 70k</SelectItem>
                        <SelectItem value="71k-100k">R$ 71k - R$ 100k</SelectItem>
                        <SelectItem value="101k-200k">R$ 101k - R$ 200k</SelectItem>
                        <SelectItem value="201k-500k">R$ 201k - R$ 500k</SelectItem>
                        <SelectItem value="501k-1m">R$ 501k - R$ 1M</SelectItem>
                        <SelectItem value="1m-5m">R$ 1M - R$ 5M</SelectItem>
                        <SelectItem value="5m+">Acima de R$ 5M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {errorMessage && <p className="text-red-400 text-sm font-medium mt-1">{errorMessage}</p>}

                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "RECEBER MAIS INFORMAÇÕES"}
                </Button>
              </form>
            </motion.div>

            {/* Right column - Information with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8 max-[380px]:space-y-6 max-[380px]:flex max-[380px]:flex-col max-[380px]:items-stretch max-[380px]:px-2"
            >
              <div className="space-y-6">
                <h3 className="font-bold sm:text-lg lg:text-2xl max-[640px]:text-md max-[380px]:text-sm">
                  Agende uma reunião online, receba um diagnóstico e comece a escalar as vendas do seu negócio.
                </h3>

                <div className="h-1 w-24 bg-gradient-to-r from-primary to-destructive rounded-full" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="border border-border/50 rounded-2xl p-6 bg-card/30 backdrop-blur-sm max-[380px]:p-4"
              >
                <p className="leading-relaxed sm:text-md lg:text-xl max-[640px]:text-sm max-[380px]:text-xs max-[380px]:whitespace-normal">
                  Envie seus dados e da sua empresa <span className="text-primary font-semibold">gratuitamente</span> através de um rápido formulário.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="border border-border/50 rounded-2xl p-6 bg-card/30 backdrop-blur-sm max-[380px]:p-4"
              >
                <p className="leading-relaxed sm:text-md lg:text-xl max-[640px]:text-sm max-[380px]:text-xs max-[380px]:whitespace-normal">
                  Em até 24h um <span className="text-primary font-semibold">especialista do Grupo Rapina COM</span> entrará em contato{" "}
                  <span className="text-foreground">para marcar a reunião online de diagnóstico da sua empresa.</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
