from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class Studio(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    subcategory = models.ForeignKey('SubCategory', on_delete=models.PROTECT)
    city = models.CharField(max_length=120)
    basic_price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    image_url = models.URLField(blank=True)
    instant_booking = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class StudioRoom(models.Model):
    studio = models.ForeignKey('Studio', on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.studio.name} - {self.name}"


class Media(models.Model):
    studio = models.ForeignKey('Studio', on_delete=models.CASCADE, related_name='media')
    url = models.URLField()
    media_type = models.CharField(max_length=10, choices=(('image','image'),('video','video')), default='image')


class Review(models.Model):
    studio = models.ForeignKey('Studio', on_delete=models.CASCADE, related_name='reviews')
    author = models.CharField(max_length=100)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class SavedStudio(models.Model):
    # For demo, store by email string
    user_email = models.EmailField()
    studio = models.ForeignKey('Studio', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user_email', 'studio')


