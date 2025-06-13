import React from 'react';
import RelatedListTarget from './RelatedListTarget';
import RelatedListEquip from './RelatedListEquip';

export default function DetailRelatedList() {
    return (
        <div>
            <h1>Related workout list goes here</h1>
            <RelatedListTarget />
            <RelatedListEquip />
        </div>
    );
}
