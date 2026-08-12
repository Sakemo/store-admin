"use client";
import { Copy, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

interface ApiAlertProps{
    title: string;
    description: string;
    variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Público",
    admin: "Administrador"
};

const variantMap: Record<ApiAlertProps["variant"], "secondary" | "destructive"> = {
    public: "secondary",
    admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("Copiado com sucesso");
    }

    return (
        <Alert className="p-4">
            <ServerIcon className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="px-2 relative rounded bg-muted px-[0.3rem]py-[0.2rem] font-mono text-sm font-semibold">
                {description}
                </code>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onCopy(description)}
                >
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>           
        </Alert>
    )
}