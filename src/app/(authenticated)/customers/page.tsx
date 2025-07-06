import { Page } from "@/components/page";
import { getAll } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { CustomersView } from "./_components/customers-view";
import { TitleActions } from "./_components/title-actions";

export default async function CustomersPage() {
  const user = await currentUser();
  const data = await getAll(user as User);

  return (
    <Page title="לקוחות" titleActions={<TitleActions />}>
      <CustomersView data={data} />
    </Page>
  );
}

