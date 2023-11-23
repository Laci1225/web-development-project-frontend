import React from "react";

import {Button, ButtonProps} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
    value: string
}

function LoadingButton({isLoading, value, ...props}: LoadingButtonProps) {

    return <Button {...props} disabled={isLoading}>
        {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        ) : (
            value
        )}
    </Button>
}

export default LoadingButton;