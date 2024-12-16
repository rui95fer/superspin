<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    // Array of coaches
    private array $coaches = [
        ['name' => 'John Doe', 'experience' => 5, 'rate' => 20, 'location' => 'Cairo, Egypt', 'joined' => '2021-01-01'],
        ['name' => 'Jane Smith', 'experience' => 10, 'rate' => 30, 'location' => 'Giza, Egypt', 'joined' => '2020-05-15'],
        ['name' => 'Ali Hassan', 'experience' => 7, 'rate' => 25, 'location' => 'Alexandria, Egypt', 'joined' => '2022-03-10'],
        ['name' => 'Ahmed Mohamed', 'experience' => 3, 'rate' => 15, 'location' => 'Cairo, Egypt', 'joined' => '2019-09-20'],
        ['name' => 'Mona Ali', 'experience' => 9, 'rate' => 35, 'location' => 'Giza, Egypt', 'joined' => '2021-07-05']
    ];

    // Handles the index request for coaches
    public function index(Request $request)
    {
        $data = $this->coaches;

        // Filtering by name or location
        if ($request->has('filter')) {
            $filter = strtolower($request->query('filter'));

            $data = array_filter($data, function ($coach) use ($filter) {
                return str_contains(strtolower($coach['name']), $filter) || str_contains(strtolower($coach['location']), $filter);
            });
        }

        // Sorting by hourly rate
        if ($request->has('sort')) {
            $sortOrder = strtolower($request->query('sort')) === 'desc' ? SORT_DESC : SORT_ASC;
            usort($data, fn($a, $b) => $sortOrder === SORT_DESC ? $b['rate'] <=> $a['rate'] : $a['rate'] <=> $b['rate']);
        }

        return new JsonResponse($data);
    }
}
