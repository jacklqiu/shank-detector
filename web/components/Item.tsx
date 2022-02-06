import React, { FC } from "react";
import { Spinner, Stack, Image, Button, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import {
  isLoaded,
  useFirebase,
  useFirebaseConnect,
} from "react-redux-firebase";
import { useAppSelector } from "../redux/hooks";
import { PointData } from "../data/PointData";

interface Props {
  id: string;
}

const Item: FC<Props> = ({ id }) => {
  const firebase = useFirebase();

  useFirebaseConnect([{ path: `points/${id}` }]);

  const point: PointData = useAppSelector(
    (state) => state.firebase.data.points && state.firebase.data.points[id]
  );

  if (!isLoaded(point)) {
    return <Spinner size="xl" color="white" />;
  }

  return (
    <Stack direction="row" background={"white"} m={4} width={"50%"}>
      <Image
        src={point.image_url}
        alt={point.title}
        objectFit="cover"
        boxSize="400"
        borderRadius="xl"
      />
      <Stack direction="column"justifyContent={'center'}>
        <Stack direction="row"  align={'flex'}>
          <Button
            h={20}
            w={40}
            mx={5}
            onClick={() =>
              firebase.update(`points/${id}`, { isThreat: !point.isThreat })
            }
          >
            Flag as a threat
          </Button>{" "}
          <WarningIcon
            w={20}
            h={20}
            color={point.isThreat ? "red.500" : "yellow.500"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Item;
