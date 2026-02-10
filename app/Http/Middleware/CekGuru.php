<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CekGuru
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Logika: Cek apakah user sudah login DAN perannya 'guru'
        if (Auth::check() && Auth::user()->peran === 'guru') {
            return $next($request); // Lanjut masuk
        }

        // Jika bukan guru, tendang kembali ke Halaman Utama
        return redirect('/'); 
    }
}