<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullToPersonalBests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('personal_bests', function ($table) {
            $table->string('min_distance')->nullable()->change();
            $table->string('max_distance')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('personal_bests', function ($table) {
            $table->string('min_distance')->change();
            $table->string('max_distance')->change();
        });
    }
}
