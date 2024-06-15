import Modal from "@/ui/modal/modal";
import FormUpdCreate from "@/components/forms/upd/formUpdCreate";

export default function CreateUpd() {
  return (
    <Modal>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Добавление УПД111
          </h2>
        </div>
        <FormUpdCreate textButton="Добавить" />
      </div>
    </Modal>
  );
}
