import React, { useState } from "react";
import ChainForm from "../components/ChainForm";
import { useStore } from "../store/useStore";
import type { HotelChain } from "../types";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

const AddChainPage: React.FC = () => {
  const { addChain, deleteChain, updateChain, chains } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<HotelChain | null>(null);

  const handleAddChain = (chain: HotelChain) => {
    addChain({ ...chain, id: Date.now().toString() });
  };

  const handleEditChain = (chain: HotelChain) => {
    updateChain(chain.id, chain);
    setIsEditModalOpen(false);
  };

  const handleDeleteChain = (id: string) => {
    deleteChain(id);
  };

  const openEditModal = (chain: HotelChain) => {
    setSelectedChain(chain);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-screen mx-auto pt-[7vh]">
      <div className="container mx-auto p-2 lg:p-6 max-w-2xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Hotel Chains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChainForm onSubmit={handleAddChain} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Existing Chains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {chains.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No chains added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {[...chains].reverse().map((chain, index) => (
                    <React.Fragment key={chain.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-medium text-gray-800">
                            {chain.name}
                          </h2>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() => openEditModal(chain)}
                            >
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleDeleteChain(chain.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Chain</DialogTitle>
            </DialogHeader>
            {selectedChain && (
              <ChainForm onSubmit={handleEditChain} chain={selectedChain} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddChainPage;
