<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreJobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'position_id' => [
                'required',
                'integer',
                Rule::exists('positions', 'id')
                    ->where('is_active', true),
            ],

            'first_name' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],

            'last_name' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],

            'phone' => [
                'required',
                'string',
                'regex:/^05[0-9]{9}$/',
            ],

            'email' => [
                'required',
                'email:rfc',
                'max:255',
            ],

            'gender' => [
                'required',
                Rule::in([
                    'male',
                    'female',
                ]),
            ],

            'birth_date' => [
                'required',
                'date',
                'after_or_equal:1940-01-01',
                'before_or_equal:' . now()
                    ->subYears(16)
                    ->format('Y-m-d'),
            ],

            'city' => [
                'required',
                'string',
                'max:100',
            ],

            'district' => [
                'nullable',
                'string',
                'max:100',
            ],

            'experience' => [
                'required',
                'integer',
                'min:0',
                'max:60',
            ],

            'education_level' => [
                'required',
                Rule::in([
                    'primary_school',
                    'middle_school',
                    'high_school',
                    'associate_degree',
                    'bachelor_degree',
                    'master_degree',
                    'doctorate',
                ]),
            ],

            'employment_type' => [
                'required',
                Rule::in([
                    'full_time',
                    'part_time',
                ]),
            ],

            'military_status' => [
                'nullable',
                Rule::in([
                    'completed',
                    'deferred',
                    'exempt',
                    'not_completed',
                ]),
            ],

            'driver_license' => [
                'nullable',
                'string',
                'max:50',
            ],

            'smoker' => [
                'nullable',
                'boolean',
            ],

            'shift_available' => [
                'required',
                'boolean',
            ],

            'about' => [
                'nullable',
                'string',
                'max:2000',
            ],

            /*
             * Referans bilgileri isteğe bağlıdır.
             */
            'reference_name' => [
                'nullable',
                'string',
                'max:200',
            ],

            'reference_phone' => [
                'nullable',
                'string',
                'regex:/^05[0-9]{9}$/',
            ],

            'cv' => [
                'required',
                'file',
                'mimes:pdf,doc,docx',
                'max:5120',
            ],

            'kvkk_approved' => [
                'accepted',
            ],

            'turnstile_token' => [
                'required',
                'string',
                'max:2048',
            ],
        ];
    }

    /**
     * Validation error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'position_id.required' =>
                'Başvurulan pozisyonu seçmelisiniz.',

            'position_id.integer' =>
                'Başvurulan pozisyon bilgisi geçersiz.',

            'position_id.exists' =>
                'Seçilen pozisyon geçerli veya aktif değil.',

            'first_name.required' =>
                'Ad alanı zorunludur.',

            'first_name.string' =>
                'Ad alanı geçerli bir metin olmalıdır.',

            'first_name.min' =>
                'Ad en az 2 karakter olmalıdır.',

            'first_name.max' =>
                'Ad en fazla 100 karakter olabilir.',

            'last_name.required' =>
                'Soyad alanı zorunludur.',

            'last_name.string' =>
                'Soyad alanı geçerli bir metin olmalıdır.',

            'last_name.min' =>
                'Soyad en az 2 karakter olmalıdır.',

            'last_name.max' =>
                'Soyad en fazla 100 karakter olabilir.',

            'phone.required' =>
                'Telefon numarası zorunludur.',

            'phone.string' =>
                'Telefon numarası geçersiz.',

            'phone.regex' =>
                'Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır.',

            'email.required' =>
                'E-posta adresi zorunludur.',

            'email.email' =>
                'Geçerli bir e-posta adresi giriniz.',

            'email.max' =>
                'E-posta adresi en fazla 255 karakter olabilir.',

            'gender.required' =>
                'Cinsiyet seçimi zorunludur.',

            'gender.in' =>
                'Cinsiyet alanında yalnızca Kadın veya Erkek seçeneklerinden biri seçilebilir.',

            'birth_date.required' =>
                'Doğum tarihi alanı zorunludur.',

            'birth_date.date' =>
                'Doğum tarihi geçerli bir tarih olmalıdır.',

            'birth_date.before_or_equal' =>
                'Başvuru yapabilmek için en az 16 yaşında olmalısınız.',

            'birth_date.after_or_equal' =>
                'Doğum tarihi 1940 yılından önce olamaz.',

            'city.required' =>
                'Şehir alanı zorunludur.',

            'city.string' =>
                'Şehir alanı geçerli bir metin olmalıdır.',

            'city.max' =>
                'Şehir alanı en fazla 100 karakter olabilir.',

            'district.string' =>
                'İlçe alanı geçerli bir metin olmalıdır.',

            'district.max' =>
                'İlçe alanı en fazla 100 karakter olabilir.',

            'experience.required' =>
                'Deneyim süresi zorunludur.',

            'experience.integer' =>
                'Deneyim süresi tam sayı olmalıdır.',

            'experience.min' =>
                'Deneyim süresi 0 yıldan küçük olamaz.',

            'experience.max' =>
                'Deneyim süresi 60 yıldan büyük olamaz.',

            'education_level.required' =>
                'Eğitim durumunu seçmelisiniz.',

            'education_level.in' =>
                'Geçersiz eğitim durumu seçimi.',

            'employment_type.required' =>
                'Çalışma şeklini seçmelisiniz.',

            'employment_type.in' =>
                'Geçersiz çalışma şekli seçimi.',

            'military_status.in' =>
                'Geçersiz askerlik durumu seçimi.',

            'driver_license.string' =>
                'Ehliyet alanı geçerli bir metin olmalıdır.',

            'driver_license.max' =>
                'Ehliyet alanı en fazla 50 karakter olabilir.',

            'smoker.boolean' =>
                'Sigara kullanımı alanı doğru veya yanlış olmalıdır.',

            'shift_available.required' =>
                'Vardiyalı çalışma durumunu belirtmelisiniz.',

            'shift_available.boolean' =>
                'Vardiyalı çalışma alanı doğru veya yanlış olmalıdır.',

            'about.string' =>
                'Hakkınızda alanı geçerli bir metin olmalıdır.',

            'about.max' =>
                'Kendinizi tanıttığınız alan en fazla 2000 karakter olabilir.',

            /*
             * Referans validation mesajları
             */

            'reference_name.string' =>
                'Referans adı soyadı geçerli bir metin olmalıdır.',

            'reference_name.max' =>
                'Referans adı soyadı en fazla 200 karakter olabilir.',

            'reference_phone.string' =>
                'Referans telefon numarası geçersiz.',

            'reference_phone.regex' =>
                'Referans telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır.',

            'cv.required' =>
                'CV dosyası yüklemelisiniz.',

            'cv.file' =>
                'Yüklenen CV geçerli bir dosya olmalıdır.',

            'cv.mimes' =>
                'CV yalnızca PDF, DOC veya DOCX formatında olabilir.',

            'cv.max' =>
                'CV dosyası en fazla 5 MB olabilir.',

            'kvkk_approved.accepted' =>
                'KVKK onayını kabul etmelisiniz.',

            'turnstile_token.required' =>
                'Lütfen robot doğrulamasını tamamlayınız.',

            'turnstile_token.string' =>
                'Robot doğrulama verisi geçersiz.',

            'turnstile_token.max' =>
                'Robot doğrulama verisi geçersiz.',
        ];
    }

    /**
     * Human-readable field names.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'position_id' => 'pozisyon',
            'first_name' => 'ad',
            'last_name' => 'soyad',
            'phone' => 'telefon',
            'email' => 'e-posta',
            'gender' => 'cinsiyet',
            'birth_date' => 'doğum tarihi',
            'city' => 'şehir',
            'district' => 'ilçe',
            'experience' => 'deneyim',
            'education_level' => 'eğitim durumu',
            'employment_type' => 'çalışma şekli',
            'military_status' => 'askerlik durumu',
            'driver_license' => 'ehliyet',
            'smoker' => 'sigara kullanımı',
            'shift_available' => 'vardiyalı çalışma',
            'about' => 'hakkınızda',

            'reference_name' => 'referans adı soyadı',
            'reference_phone' => 'referans telefon numarası',

            'cv' => 'CV',
            'kvkk_approved' => 'KVKK onayı',
            'turnstile_token' => 'robot doğrulaması',
        ];
    }
}