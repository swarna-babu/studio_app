from rest_framework import serializers
from .models import Category, SubCategory, Studio, Media, Review, StudioRoom


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'subcategories']


class StudioSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    subcategory = serializers.CharField(source='subcategory.name', read_only=True)

    class Meta:
        model = Studio
        fields = ['id', 'name', 'category', 'subcategory', 'city', 'basic_price', 'rating', 'image_url', 'instant_booking']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'url', 'media_type']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author', 'rating', 'comment', 'created_at']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioRoom
        fields = ['id', 'name', 'description']


class StudioDetailSerializer(StudioSerializer):
    media = MediaSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    rooms = RoomSerializer(many=True, read_only=True)

    class Meta(StudioSerializer.Meta):
        fields = StudioSerializer.Meta.fields + ['media', 'reviews', 'rooms']


