import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

// The props are now simpler, but include the new optional 'tag'
const MovieCard = ({ $id, posterUrl, title, tag }: Movie) => {
  return (
    <Link href={`/movie/${$id}`} asChild>
      <TouchableOpacity className="w-36 space-y-2 mr-4">
        <View className="w-36 h-48">
          <Image
            source={{
              uri:
                posterUrl ||
                "https://placehold.co/600x400/FFE0E0/4A4A4A.png?text=Image+Not+Available",
            }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />

          {/* This is the new Tag overlay */}
          {tag && (
            <View className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-bold uppercase">
                {tag}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-darkText text-sm font-semibold" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
