import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery.trim() ? searchQuery : undefined,
      }),
    false,
  );

  // debouncing search input
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={(movies as any)?.results ?? []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        className="flex-1 px-5"
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />
            </View>

            <View className="my-5 px-5">
              <SearchBar
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Search movies..."
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              (movies as any)?.results?.length > 0 && (
                <Text className="text-white text-xl font-bold mb-3">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className=" px-5">
              <Text className="text-white/70 text-center">
                {searchQuery.trim() ? "No movies found." : "Search for movies."}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Search;
