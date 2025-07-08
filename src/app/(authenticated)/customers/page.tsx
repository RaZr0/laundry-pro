import { Page } from "@/components/page";
import { getAll } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { CustomersView } from "./_components/customers-view";
import { TitleActions } from "./_components/title-actions";
import { Customer } from "@/types/customer";

export default async function CustomersPage() {
  const user = await currentUser();
  const data = await getAll(user as User) as unknown as Customer[];

  return (
    <Page title="לקוחות" titleActions={<TitleActions />}>
      <CustomersView data={data} />
    </Page>
  );
}

