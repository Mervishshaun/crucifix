import { StyleSheet, View, Text } from 'react-native';
import DecisionTree from '@/components/ABC/Game';

// Example tree data
const treeData = {
  question: "What are you working at?",
  options: [
    {
      label: "A Game",
      node: {
        question: "Choose a sport",
        options: [
          {
            label: "Wrestling",
            node: {
              question: "Choose a focus",
              options: [
                { label: "Upper Body", node: { result: "You chose Wrestling > Upper Body!" } },
                { label: "Lower Body", node: { result: "You chose Wrestling > Lower Body!" } },
                { label: "Scrimmage", node: { result: "You chose Wrestling > Scrimmage!" } }
              ]
            }
          },
          {
            label: "BJJ",
            node: { result: "You chose BJJ!" }
          }
        ]
      }
    },
    {
      label: "B Game",
      node: { result: "B Game selected!" }
    },
    {
      label: "C Game",
      node: { result: "C Game selected!" }
    }
  ]
};

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.centeredText}>
          Crucifix
        </Text>
      </View>
      <DecisionTree node={treeData} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: 'black',
  },
  textContainer: {
    backgroundColor: '#f0f4ff',
    padding: 0,
    width: '100%',
    borderRadius: 0,
    shadowColor: '#000',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  centeredText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
});

// Type definitions
type ResultNode = {
  result: string;
};

type Option = {
  label: string;
  node: OptionNode | ResultNode;
};

type OptionNode = {
  question: string;
  options: Option[];
};
