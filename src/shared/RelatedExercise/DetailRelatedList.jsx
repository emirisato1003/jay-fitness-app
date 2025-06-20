import React from 'react';
import RelatedListTarget from './RelatedListTarget';
import RelatedListEquip from './RelatedListEquip';

export default function DetailRelatedList() {
    return (
        <div>
            <h2>similar target workouts </h2>
            <RelatedListTarget />
            <h2>similar equipment workouts</h2>
            <RelatedListEquip />
        </div>
    );
}
