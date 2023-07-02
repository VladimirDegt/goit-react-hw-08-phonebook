import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';

export function ModalChange(props) {
  const dispatch = useDispatch();
  const [id] = useState(props.id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      updateContact({
        id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => Notify.success('Контакт оновлено'))
      .catch(error => Notify.failure('Упс, щось пішло не так'));
    resetForm();
    onClose();
  };

  const initialValues = {
    name: props.name,
    number: props.number,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change contact</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex bg="gray.100" align="center" justify="center" h="65vh">
            <Box bg="white" p={8} rounded={4} w="50vh">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="name"
                          variant="filled"
                          validate={value => {
                            let error;

                            if (value.length < 4) {
                              error = 'Name must contain at least 4 characters';
                            }

                            return error;
                          }}
                        />
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.number && touched.number}
                      >
                        <FormLabel htmlFor="number">Number</FormLabel>
                        <Field
                          as={Input}
                          id="number"
                          name="number"
                          type="number"
                          variant="filled"
                          validate={value => {
                            let error;

                            if (value.length < 6) {
                              error =
                                'Number must contain at least 6 characters';
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button type="submit" colorScheme="blue" width="full">
                        Update
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
