import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/context/GlobalProvider";
import {
  getFavorites,
  getMovieById,
  getUserPurchases,
  getWatchHistory,
} from "@/services/appwrite";

import MovieCarousel from "@/components/MovieCarousel";
import useFetch from "@/services/usefetch";

const Profile = () => {
  const { user } = useGlobalContext();

  const [watchHistoryMovies, setWatchHistoryMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  // Fetch data when the user object is available
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        // If user logs out, clear the lists
        setWatchHistoryMovies([]);
        setFavoriteMovies([]);
        return;
      }

      // --- Fetch Watch History ---
      try {
        setIsLoadingHistory(true);
        // --- THIS IS THE FIX: Clear the array before fetching ---
        setWatchHistoryMovies([]);
        const historyItems = await getWatchHistory(user.$id);
        if (historyItems.length > 0) {
          const moviePromises = historyItems.map((item) =>
            getMovieById(item.movieId),
          );
          const movies = await Promise.all(moviePromises);
          setWatchHistoryMovies(movies.filter((m) => m) as Movie[]);
        }
      } catch (error) {
        console.error("Failed to fetch watch history:", error);
      } finally {
        setIsLoadingHistory(false);
      }

      // --- Fetch Favorites ---
      try {
        setIsLoadingFavorites(true);
        // --- THIS IS THE FIX: Clear the array before fetching ---
        setFavoriteMovies([]);
        const favoriteItems = await getFavorites(user.$id);
        if (favoriteItems.length > 0) {
          const moviePromises = favoriteItems.map((item) =>
            getMovieById(item.movieId),
          );
          const movies = await Promise.all(moviePromises);
          setFavoriteMovies(movies.filter((m) => m) as Movie[]);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const { data: purchases } = useFetch(() => getUserPurchases(user?.$id ?? ""));
  const activeSubscription = purchases?.find((p) =>
    p.movieId.includes("ALL_ACCESS"),
  );

  // Handle case where user is not logged in
  if (!user) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-darkText text-lg">
          Please log in to view your profile.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView>
        {/* --- User Info Section --- */}
        <View className="items-center mt-16">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-2xl font-bold text-darkText mt-4">
            {user?.name}
          </Text>
        </View>

        {/* --- Watch History Section --- */}
        <MovieCarousel
          title="Миний үзсэн кино"
          movies={watchHistoryMovies}
          isLoading={isLoadingHistory}
        />

        {/* --- Favorites Section --- */}
        <MovieCarousel
          title="Миний дуртай кино"
          movies={favoriteMovies}
          isLoading={isLoadingFavorites}
        />

        {/* --- Subscription Section --- */}
        <View className="mt-8 mx-4">
          <Text className="text-xl font-bold text-darkText mb-4">
            Миний гишүүнчлэл
          </Text>
          {activeSubscription ? (
            <View className="p-4 bg-secondary rounded-2xl">
              <Text className="text-lg font-bold text-darkText capitalize">
                {activeSubscription.movieId
                  .replace("ALL_ACCESS_", "")
                  .toLowerCase()}{" "}
                Plan
              </Text>
              <Text className="text-sm text-lightText mt-2">
                Дуусах хугацаа:{" "}
                {new Date(activeSubscription.expiresAt).toLocaleDateString()}
              </Text>
              <TouchableOpacity className="bg-accent rounded-full py-3 mt-4">
                <Text className="text-white font-bold text-center">
                  Сунгах / Засах
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="p-4 bg-secondary rounded-2xl items-center">
              <Text className="text-lightText">
                You have no active subscriptions.
              </Text>
              <TouchableOpacity className="bg-accent rounded-full py-3 mt-4 px-8">
                <Text className="text-white font-bold text-center">
                  Subscribe Now
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
