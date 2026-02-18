import { getFields } from "@/lib/api";
import DynamicForm from "../parts/DynamicForm";

export default async function ContactLayout({ slug, config }) {
  const fieldsData = await getFields("1");
  const fields = fieldsData?.sort((a, b) => parseInt(a.turn) - parseInt(b.turn)) || [];

  return (
    <div className="container mx-auto p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">お問い合わせ</h1>
      <p className="mb-8 text-gray-600">
        以下のフォームに必要事項をご記入の上、送信してください。
      </p>
      <DynamicForm fields={fields} />
    </div>
  );
}