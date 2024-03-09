import { Box, Button, Container, Heading, Radio, RadioGroup, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";

const questions = [
  {
    question: "What's your favorite music genre?",
    options: [
      { label: "Pop", value: "air" },
      { label: "Rock", value: "fire" },
      { label: "Classical", value: "earth" },
      { label: "Jazz", value: "water" },
    ],
  },
  // ... add all other questions in similar format
];

const auraPoints = {
  air: 0,
  fire: 0,
  earth: 0,
  water: 0,
};

const Index = () => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleOptionChange = (questionIndex, optionValue) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionValue,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const resultPoints = { ...auraPoints };
    Object.values(answers).forEach((aura) => {
      if (resultPoints[aura] !== undefined) {
        resultPoints[aura]++;
      }
    });

    const resultAura = Object.keys(resultPoints).reduce((a, b) => (resultPoints[a] > resultPoints[b] ? a : b));
    setIsSubmitted(true);
    toast({
      title: "Aura Result",
      description: `Your aura is: ${resultAura.toUpperCase()}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Personality Aura Quiz
        </Heading>
        {!isSubmitted ? (
          questions.map((question, index) => (
            <Box key={index} p={5} shadow="md">
              <Text mb={2}>{question.question}</Text>
              <RadioGroup onChange={(value) => handleOptionChange(index, value)}>
                <Stack direction="column">
                  {question.options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          ))
        ) : (
          <Text>Congratulations! Check your aura result in the notification.</Text>
        )}
        <Button colorScheme="blue" onClick={handleSubmit} isDisabled={isSubmitted}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
