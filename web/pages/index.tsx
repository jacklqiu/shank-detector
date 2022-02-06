import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import {
  isLoaded,
  useFirebase,
  useFirebaseConnect,
} from "react-redux-firebase";
import PageLayout from "../components/PageLayout";
import { useAppSelector } from "../redux/hooks";
import { Spinner } from "@chakra-ui/spinner";
import Item from '../components/Item';
import {PointData} from '../data/PointData';

const Home: NextPage = () => {
  useFirebaseConnect([
    { path: "points", queryParams: ["orderByChild=timestamp", "desc"] },
  ]);

  const pointsData = useAppSelector((state) => state.firebase.ordered.points);
  console.log(pointsData)
  if (!isLoaded(pointsData)) {
    return <Spinner size="xl" color="white" />;
  }

  return (
    <PageLayout>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1600px" }}
        m="0 auto"
      >
        {pointsData.map((pd: any) => <Item id={pd.key}></Item>)}
      </Flex>
    </PageLayout>
  );
};

export default Home;
