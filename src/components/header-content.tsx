"use client";
import { House, LogOut, Star } from "lucide-react";
import { CustomLink } from "@/components/next/custom-link";
import { Badge } from "@/components/ui/badge";
import useFavorite from "@/use-cases/use-favorite";

type Props = {};

const HeaderContent: React.FC<Props> = () => {
  const { favoriteCount } = useFavorite();

  return (
    <div className="w-full flex">
      <div className="grow"></div>
      <CustomLink href="/">
        <House />
      </CustomLink>
      <CustomLink href="/favorites" className="relative mx-5">
        {favoriteCount > 0 && (
          <Badge variant="warning" className="absolute top-[-10px] right-[10px] py-0 px-[3px]">
            {favoriteCount}
          </Badge>
        )}
        <Star color="orange" />
      </CustomLink>
      <LogOut />
    </div>
  );
};

HeaderContent.displayName = "HeaderContent";

export { HeaderContent };
