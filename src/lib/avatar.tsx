import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar  } from "@dicebear/core";

interface Props {
    seed: string;
    variant: "bottsNeutral" | "initials";
};

export const generateAvatarUri = ({seed, variant}: Props) => {
    let avatar;

    if(variant === "bottsNeutral") {
        avatar = createAvatar(botttsNeutral, {seed});
    } else {
        avatar = createAvatar(initials, {seed, fontWeight: 500, fontSize: 42});
    }

    return avatar.toDataUri();
}