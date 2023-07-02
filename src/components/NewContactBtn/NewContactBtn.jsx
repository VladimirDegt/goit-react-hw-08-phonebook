import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
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
import { addContact } from 'redux/contacts/operations';
import { selectContactsState } from 'redux/contacts/selectors';

export const NewContactBtn = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectContactsState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    resetForm();
  };

  const initialValues = {
    name: '',
    number: '',
  };

  return (
    <>  
      {isLoading && <p>Loading...</p>}
      <Button colorScheme="blue" onClick={onOpen}>
        Create contact
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new contact</ModalHeader>
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
                                error =
                                  'Name must contain at least 4 characters';
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
                          Create
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
    </>
  );
};
