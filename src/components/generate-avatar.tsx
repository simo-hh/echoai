import { createAvatar } from '@dicebear/core';
import {botttsNeutral, initials} from '@dicebear/collection';

import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface GenerateAvatarProps {
    seed: string;
    className?: string;
    variant: "bottsNeutral" | "initials";
}

export const GenerateAvatar = ({
    seed,
    className,
    variant
}: GenerateAvatarProps) => {
    let avatar;

    if (variant === "bottsNeutral") {
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    } else if (variant === "initials") {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 64,
            backgroundColor: ["#FFD700"],
        });
    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar?.toDataUri()} alt="Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
};