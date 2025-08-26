from django.urls import path
from .views import StudioListView, CategoryListView, StudioDetailView, SaveStudioView, SavedStudiosListView

urlpatterns = [
    path('studios/', StudioListView.as_view(), name='studios_list'),
    path('categories/', CategoryListView.as_view(), name='categories_list'),
    path('studios/<int:pk>/', StudioDetailView.as_view(), name='studio_detail'),
    path('studios/<int:pk>/save/', SaveStudioView.as_view(), name='studio_save'),
    path('saved-studios/', SavedStudiosListView.as_view(), name='saved_studios_list'),
]


