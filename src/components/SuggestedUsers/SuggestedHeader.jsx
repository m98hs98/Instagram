import { Avatar, Text, Flex, Button, Link } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../Store/authStore";


const SuggestedHeader = () => {

    const { handleLogout, isLoadingOut } = useLogout();
    const authUser = useAuthStore((state) => state.user);


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`${authUser.username}`}>
                <Avatar size={"lg"} src={authUser.profilePicURL} />
            </Link>
            <Link to={`${authUser.username}`}>
                <Text fontSize={12} fontWeight={"bold"}>
                    {authUser.username}
                </Text>
            </Link>
        </Flex>
        <Button
            size={"xs"}
            background={"transparent"}
            _hover={{ background: "transparent"}}
            fontSize={14}
            fontWeight={"medium"}
            color={"blue.400"}
            cursor={"pointer"}
            onClick={handleLogout}
            isLoading={isLoadingOut}
        >
            Log Out
        </Button>
    </Flex>
  );
};

export default SuggestedHeader;