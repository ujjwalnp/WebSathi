"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "@tremor/react";
import { Role, type Agency } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import {
  deleteAgency,
  updateAgencyDetails,
  upsertAgency,
} from "@/queries/agency";
import { saveActivityLogsNotification } from "@/queries/notifications";
import { initUser } from "@/queries/auth";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import FileUpload from "../common/FileUpload";

import {
  AgencyDetailsValidator,
  type AgencyDetailsSchema,
} from "@/lib/validators/agency-details";

interface AgencyDetailsProps {
  data?: Partial<Agency>;
}

const AgencyDetails: React.FC<AgencyDetailsProps> = ({ data }) => {
  const router = useRouter();
  const [deletingAgency, setDeletingAgency] = React.useState<boolean>(false);

  const form = useForm<AgencyDetailsSchema>({
    mode: "onChange",
    resolver: zodResolver(AgencyDetailsValidator),
    defaultValues: {
      whiteLabel: data?.whiteLabel || false,
      ...data,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  React.useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<AgencyDetailsSchema> = async (values) => {
    try {
      const newUserData = await initUser({ role: 'AGENCY_OWNER' });
      
      if (!data?.id) {
        const response = await upsertAgency({
          id: uuidv4(),
          address: values.address,
          agencyLogo: values.agencyLogo,
          city: values.city,
          companyPhone: values.companyPhone,
          country: values.country,
          name: values.name,
          state: values.state,
          whiteLabel: values.whiteLabel,
          zipCode: values.zipCode,
          createdAt: new Date(),
          updatedAt: new Date(),
          companyEmail: values.companyEmail,
          connectAccountId: "",
          goal: 5,
        });

        toast.success("Agency Created");
        return router.refresh();
      } else {
        // Handle update case if needed
        const response = await upsertAgency({
          id: data.id,
          ...values,
          updatedAt: new Date(),
        });

        toast.success("Agency Updated");
        return router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops!", {
        description: "Could not save agency information. Please try again.",
      });
    }
  };

  const handleDeleteAgency = async () => {
    if (!data?.id) return;

    setDeletingAgency(true);

    try {
      await deleteAgency(data.id);
      toast.success("Agency Deleted", {
        description: "Your agency and all related subaccounts have been deleted.",
      });
      router.refresh();
    } catch (error) {
      toast.error("Oops!", {
        description: "Could not delete your agency. Please try again.",
      });
      router.refresh();
    } finally {
      setDeletingAgency(false);
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full my-10">
        <CardHeader>
          <CardTitle>{data?.id ? "Update Agency" : "Create an Agency"}</CardTitle>
          <CardDescription>
            {data?.id 
              ? "Update your agency details below."
              : "Let's create an agency for your business. You can edit agency settings later from the agency settings tab."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Rest of your form fields remain the same */}
              {/* ... */}
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {data?.id ? "Update Agency" : "Create Agency"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {data?.id && (
        <Card className="border border-destructive">
          {/* Danger zone content remains the same */}
          {/* ... */}
        </Card>
      )}
    </AlertDialog>
  );
};

export default AgencyDetails;