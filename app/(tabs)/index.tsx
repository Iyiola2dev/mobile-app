import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
  );

  if (moviesLoading) {
    return (
      <SafeAreaView
        className="flex-1 bg-primary items-center justify-center"
        edges={["top"]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (moviesError) {
    return (
      <SafeAreaView
        className="flex-1 bg-primary items-center justify-center px-5"
        edges={["top"]}
      >
        <Text className="text-white text-center text-base">
          Error: {moviesError.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={["top"]}>
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <View className="mt-20">
            <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <Text className="text-white text-2xl font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </View>
        }
        // TMDB returns an object: { results: Movie[] }
        data={(movies as any)?.results ?? []}
        renderItem={({ item }: any) => <MovieCard {...item} />}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ListEmptyComponent={
          <Text className="text-white/70 mt-10 text-center">
            No movies found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
