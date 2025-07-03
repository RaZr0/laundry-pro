import { Page } from "@/components/page";
import { getAll } from "@/db/customers";
import { currentUser, User } from "@clerk/nextjs/server";
import { CustomersView } from "./_components/customers-view/customers-view";

export default async function Customers() {
  const user = await currentUser();
  const data = await getAll(user as User);

  console.log(data);
  

  return (
    <Page title="לקוחות">
      <CustomersView data={data} /> 
    </Page>
  );
}

