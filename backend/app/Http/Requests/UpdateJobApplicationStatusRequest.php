<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobApplicationStatusRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => [
                'required',
                Rule::in([
                    'new',
                    'reviewing',
                    'interview',
                    'accepted',
                    'rejected',
                ]),
            ],

            'admin_note' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'status.required' => 'Başvuru durumu zorunludur.',
            'status.in' => 'Geçersiz başvuru durumu.',

            'admin_note.string' => 'Yönetici notu metin olmalıdır.',
            'admin_note.max' => 'Yönetici notu en fazla 1000 karakter olabilir.',
        ];
    }
}