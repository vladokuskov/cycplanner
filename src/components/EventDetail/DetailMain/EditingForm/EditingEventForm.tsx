import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { IEvent } from '@/components/types/shared/event.types';
import { Loading } from '@/components/types/shared/loadingState.types';
import { updateEvent } from '@/firebase/events';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { EditingForm } from '../DetailMainSection.styles';

type IEditingEventForm = {
  event: IEvent | null;
  handleEventEditing: () => void;
  handleLoadingChange: (e: Loading) => void;
};

export type IEditingForm = {
  title?: string;
  description?: string;
  type?: string;
  distance?: string;
};

const EditingEventForm = ({
  event,
  handleEventEditing,
  handleLoadingChange,
}: IEditingEventForm) => {
  const [editingForm, setEditingForm] = useState<IEditingForm>({
    title: event?.title,
    description: event?.description,
    type: event?.type,
    distance: event?.distance,
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleEditingSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (event && event.id) {
        await updateEvent(event.id, editingForm);
        handleEventEditing();
        setIsSaving(false);
        handleLoadingChange(Loading.loading);
      }
    } catch (err) {
      setIsSaving(false);
      console.error(err);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditingForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <EditingForm onSubmit={handleEditingSave}>
      <Input
        onChange={handleFormChange}
        name="title"
        full
        variant="outlined"
        label="Title"
        required
        value={editingForm.title}
      />

      <Input
        onChange={handleFormChange}
        name="description"
        full
        variant="textarea"
        label="Description"
        required
        value={editingForm.description}
      />

      <Input
        onChange={handleFormChange}
        name="type"
        full
        variant="outlined"
        label="Type"
        required
        value={editingForm.type}
      />

      <Input
        onChange={handleFormChange}
        name="distance"
        full
        variant="outlined"
        label="Distance (km)"
        required
        fieldType="number"
        value={editingForm.distance}
      />

      <Button
        text={isSaving ? 'Saving' : 'Save'}
        size="sm3"
        full
        buttonType="submit"
        disabled={isSaving}
        icon={isSaving ? faCircleNotch : null}
        rotate={isSaving}
      />
    </EditingForm>
  );
};

export { EditingEventForm };
