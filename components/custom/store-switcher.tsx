"use client";
import { useParams, useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Store } from "@/lib/generated/prisma/client"
import { useStoreModal } from "@/hooks/store-modal";
import { Check, ChevronsUpDown, PlusIcon, Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem, CommandSeparator } from "../ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  className, 
  items = []
}: StoreSwitcherProps){
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
      label: item.name,
      value: item.id
    }));

    const currentStore = formattedItems.find(
      (item) => item.value === params.storeId
    );

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { label: string, value: string  }) => {
      setOpen(false);
      router.push(`/${store.value}`);
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant={"outline"}
            size={"sm"}
            role="combobox"
            aria-expanded={open}
            aria-label="Selecione um negócio"
            className={cn("py-4 justify-between", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.label}
            <ChevronsUpDown className="mr-auto ml-6 h-4 w-4 shrink-0 opacity-50"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandList>
              <CommandInput className="w-full" placeholder="Pesquisar..."/>
              <CommandEmpty>
                Sem lojas encontradas
              </CommandEmpty>
              <CommandGroup heading="Lojas">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check 
                      className={cn("mr-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                > 
                <PlusIcon className="mr-2 w-2 h-2"/>
                  Criar nova loja...
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
}