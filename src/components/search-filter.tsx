"use client";

import { useCallback, useRef } from "react";
import clsx from "clsx";
import { SlidersHorizontal } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useClickAway, useToggle } from "ahooks";

export type RadioItemType = {
  label: string;
  value: string | number;
};
export type OnChangeType = {
  name: string;
  value: string | null;
  item: RadioItemType | undefined;
};
type Props = {
  name: string;
  value: string | null;
  list: RadioItemType[];
  onChange: ({ name, value, item }: OnChangeType) => void;
  className?: string;
};

const SearchFilter: React.FC<Props> = ({ name, value, list, onChange, className }) => {
  const [openFilter, { toggle: toggleFilter, setLeft: closeFilter }] = useToggle(false);
  const awayRef = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    closeFilter();
  }, awayRef);

  const onValueChange = useCallback(
    (inputValue: string) => {
      closeFilter();
      const item = list.find((item) => item.value === inputValue);
      const value = inputValue === "default" ? null : inputValue;
      onChange({ name, value, item });
    },
    [onChange],
  );

  return (
    <div className={clsx("relative", className)} ref={awayRef}>
      <div className="relative" onClick={toggleFilter}>
        <SlidersHorizontal className="cursor-pointer hover:text-slate-500" />
        {value ? (
          <Badge variant="destructive" className="absolute top-[-10px] right-[10px] py-0 px-[3px]">
            1
          </Badge>
        ) : (
          ""
        )}
      </div>
      <div
        className={clsx(
          "transition-all duration-250 ease-in-out absolute z-20 p-4 bg-white border border-gray-300 rounded-xl shadow",
          openFilter ? "visible" : "invisible",
          className,
        )}
      >
        <RadioGroup name={name} defaultValue="option-one" onValueChange={onValueChange}>
          <div className="flex items-center space-x-2 py-1">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default" className="cursor-pointer">
              reset
            </Label>
          </div>
          {list.map((item, index) => (
            <div className="flex items-center space-x-2 py-1" key={index}>
              <RadioGroupItem value={item.value.toString()} id={item.value.toString()} />
              <Label htmlFor={item.value.toString()} className="cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
SearchFilter.displayName = "SearchFilter";

export { SearchFilter };
