import { Button } from "@/components/ui/button";

interface SocialProvider {
  id: string;
  name: string;
  iconPath: string;
  viewBox?: string;
  xmlns?: string;
  title?: string;
  role?: string;
  label: string;
}

const socialProviders: SocialProvider[] = [
  {
    id: "google",
    name: "Google",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    iconPath:
      "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
    label: "Login with Google",
  },
  {
    id: "x",
    name: "X",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    title: "X",
    iconPath:
      "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
    label: "Login with X (Formerly Twitter)",
  },
  {
    id: "facebook",
    name: "Facebook",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    title: "Facebook",
    iconPath:
      "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    label: "Login with Facebook",
  },
];

interface SocialLoginButtonsProps {
  className?: string;
  onLogin?: (provider: string) => void;
}

export function SocialLoginButtons({
  className,
  onLogin,
}: SocialLoginButtonsProps) {
  const handleLogin = (providerId: string) => {
    if (onLogin) {
      onLogin(providerId);
    }
  };

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className || ""}`}>
      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="w-[calc(33.333%-0.5rem)]"
          onClick={() => handleLogin(provider.id)}
        >
          <svg
            xmlns={provider.xmlns}
            viewBox={provider.viewBox}
            role={provider.role}
            className="h-5 w-5"
          >
            {provider.title && <title>{provider.title}</title>}
            <path fill="currentColor" d={provider.iconPath} />
          </svg>
          <span className="sr-only">{provider.label}</span>
        </Button>
      ))}
    </div>
  );
}
