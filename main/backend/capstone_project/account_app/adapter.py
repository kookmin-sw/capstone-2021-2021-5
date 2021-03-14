from allauth.account.adapter import DefaultAccountAdapter


class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.gender = data.get('gender')
        user.birthDate = data.get('birthDate')
        user.save()

        return user