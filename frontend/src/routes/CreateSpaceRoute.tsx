import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { createSpaceState } from '../state/initialState';
import { ICreateSpaceForm, IDay } from '../interfaces';
import Description from '../components/CreateSpace/Description';
import Availability from '../components/CreateSpace/Availability';
import Amenities from '../components/CreateSpace/Amenities';
import Contact from '../components/CreateSpace/Contact';
import Photos from '../components/CreateSpace/Photos';

type TStep = Omit<ICreateSpaceForm, 'selectedIndex'>;

const CreateSpaceRoute = () => {
  const [form, setForm] = useState<ICreateSpaceForm>(createSpaceState);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');

  const cancelPhotoToUpload = (fileName: string) => {
    setPhotos((prevState) => prevState.filter((file) => file.name !== fileName));
  };

  const addPhotoToList = (file: File) => {
    setPhotos((prevState) => [...prevState, file]);
  };

  const handleRemoveDay = (id: string, step: string) => {
    const updatedForm = Object.assign({}, form);
    updatedForm.steps[step]['days' as keyof TStep]['value'] = updatedForm.steps[step][
      'days' as keyof TStep
    ]['value'].filter((day: IDay) => day.id !== id);
    setForm(updatedForm);
  };

  const handleAddDay = (day: IDay, step: string) => {
    const updatedForm = Object.assign({}, form);
    updatedForm.steps[step]['days' as keyof TStep]['value'] = [
      ...updatedForm.steps[step]['days' as keyof TStep]['value'],
      day,
    ];
    setForm(updatedForm);
  };

  const handleUpdateField = (
    name: string,
    value: string | boolean,
    attribute: string,
    step: string
  ) => {
    const updatedForm = Object.assign({}, form);
    updatedForm.steps[step][name as keyof TStep][attribute] = value;
    setForm(updatedForm);
  };

  const prevPage = () => {
    if (form.selectedIndex - 1 < 0) {
      return;
    }
    setForm((prevState) => ({
      ...prevState,
      selectedIndex: prevState.selectedIndex - 1,
    }));
  };

  const nextPage = () => {
    if (Object.keys(form.steps).length < form.selectedIndex + 1) {
      return;
    }
    setForm((prevState) => ({
      ...prevState,
      selectedIndex: prevState.selectedIndex + 1,
    }));
  };

  const CheckFileUploadLimit = () => {
    const bytes = photos.reduce((acc, cur) => acc + cur.size, 0);
    return bytes > 2 * 1024 * 1024;
  };

  const checkForErrors = () => {
    let errors = false;
    const { availability, amenities, description, contact } = form.steps;
    const entireForm = Object.assign(
      {},
      { ...availability, ...amenities, ...description, ...contact }
    );

    for (let field in entireForm) {
      const { value, error } = entireForm[field as keyof typeof entireForm];
      const emptyField = typeof value === 'string' && value.trim().length === 0;
      if (emptyField || error.length > 0) {
        errors = true;
      }
    }
    return errors;
  };

  const clearErrors = () => {
    for (const step of Object.keys(form.steps)) {
      for (const key of Object.keys(form.steps[step])) {
        console.log(key);
        handleUpdateField(key, '', 'error', step);
      }
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    setUploadError('');
    if (photos.length === 0) {
      setUploadError('Please provide at least 1 photo');
      return;
    }
    if (CheckFileUploadLimit() || photos.length > 3) {
      setUploadError('Max upload file size is 2 MiB and a maximum of 3 photos');
      return;
    }

    if (checkForErrors()) {
      return;
    }

    console.log('Form Submitted');
  };

  const renderFormComponent = () => {
    switch (form.selectedIndex) {
      case 0:
        return (
          <Description
            handleUpdateField={handleUpdateField}
            step="description"
            form={form.steps.description}
          />
        );
      case 1:
        return (
          <Availability
            handleRemoveDay={handleRemoveDay}
            handleAddDay={handleAddDay}
            handleUpdateField={handleUpdateField}
            step="availability"
            form={form.steps.availability}
          />
        );
      case 2:
        return (
          <Amenities
            handleUpdateField={handleUpdateField}
            step="amenities"
            form={form.steps.amenities}
          />
        );
      case 3:
        return (
          <Contact
            handleUpdateField={handleUpdateField}
            step="contact"
            form={form.steps.contact}
          />
        );

      case 4:
        return (
          <Photos
            addPhotoToList={addPhotoToList}
            photos={photos}
            cancelPhotoToUpload={cancelPhotoToUpload}
            uploadError={uploadError}
          />
        );
      default:
        return (
          <Description
            handleUpdateField={handleUpdateField}
            step="description"
            form={form.steps.description}
          />
        );
    }
  };

  return (
    <Flex justify="center" mt="10rem">
      <Box
        color="text.primary"
        minH="500px"
        borderRadius={8}
        border="1px solid"
        borderColor="text.secondary"
        width={['95%', '95%', '600px']}
      >
        <form onSubmit={handleOnSubmit}>
          {renderFormComponent()}
          <Flex justify="center" my="3rem">
            <ButtonGroup width="90%">
              {form.selectedIndex > 0 && (
                <Button onClick={prevPage} width="100%" colorScheme="purple">
                  Prev
                </Button>
              )}
              {form.selectedIndex < Object.keys(form.steps).length ? (
                <Button onClick={nextPage} width="100%" colorScheme="purple">
                  Next
                </Button>
              ) : (
                <Button type="submit" width="100%" colorScheme="purple">
                  Create
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateSpaceRoute;
