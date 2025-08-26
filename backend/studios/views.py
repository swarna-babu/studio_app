from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Studio, Category, SavedStudio
from .serializers import StudioSerializer, CategorySerializer, StudioDetailSerializer


class StudioListView(generics.ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        qs = Studio.objects.all().order_by('name')
        city = self.request.query_params.get('city')
        date = self.request.query_params.get('date')  # placeholder
        category_ids = self.request.query_params.getlist('category')
        subcategory_ids = self.request.query_params.getlist('subcategory')
        search = self.request.query_params.get('q')
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        rating_min = self.request.query_params.get('rating_min')

        if city:
            qs = qs.filter(city__iexact=city)
        # date filtering would normally check availability; kept as placeholder
        if category_ids:
            qs = qs.filter(category_id__in=category_ids)
        if subcategory_ids:
            qs = qs.filter(subcategory_id__in=subcategory_ids)
        if search:
            qs = qs.filter(Q(name__icontains=search))
        if price_min:
            qs = qs.filter(basic_price__gte=price_min)
        if price_max:
            qs = qs.filter(basic_price__lte=price_max)
        if rating_min:
            qs = qs.filter(rating__gte=rating_min)
        return qs


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class StudioDetailView(generics.RetrieveAPIView):
    queryset = Studio.objects.all()
    serializer_class = StudioDetailSerializer


class SaveStudioView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        studio_id = kwargs.get('pk')
        email = request.data.get('email')
        if not email:
            return Response({"detail": "email required"}, status=status.HTTP_400_BAD_REQUEST)
        SavedStudio.objects.get_or_create(user_email=email, studio_id=studio_id)
        return Response({"saved": True})

    def delete(self, request, *args, **kwargs):
        studio_id = kwargs.get('pk')
        email = request.data.get('email')
        if not email:
            return Response({"detail": "email required"}, status=status.HTTP_400_BAD_REQUEST)
        SavedStudio.objects.filter(user_email=email, studio_id=studio_id).delete()
        return Response({"removed": True})


class SavedStudiosListView(generics.ListAPIView):
    serializer_class = StudioSerializer

    def get_queryset(self):
        email = self.request.query_params.get('email')
        if not email:
            return Studio.objects.none()
        ids = SavedStudio.objects.filter(user_email=email).values_list('studio_id', flat=True)
        return Studio.objects.filter(id__in=list(ids))


